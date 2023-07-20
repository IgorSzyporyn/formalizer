import type { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import type { FlatTree, FlattenedItem, TreeItem, TreeItems } from '../typings/sortable-tree-types';
import { FormalizedModel } from '@formalizer/core';

export const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

type ProjectionResult = {
  depth: number;
  maxDepth: number;
  minDepth: number;
  parentId: UniqueIdentifier | null;
  disallowedMove: boolean;
  previousItem?: FlattenedItem;
  previousItemIndex: number;
  nextItemIndex: number;
};

export function getProjection(
  items: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number,
  model?: FormalizedModel
): ProjectionResult {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];

  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItemIndex = overItemIndex - 1;
  const nextItemIndex = overItemIndex + 1;
  const previousItem = newItems[previousItemIndex];
  const nextItem = newItems[nextItemIndex];

  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;

  const maxDepth = getMaxDepth({ previousItem });
  const minDepth = getMinDepth({ nextItem });

  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  const parentId = getParentId();

  const disallowedMove = checkDisallowedMove({ items, parentId, activeItem, model });

  return {
    depth,
    maxDepth,
    minDepth,
    parentId,
    disallowedMove,
    previousItem,
    previousItemIndex,
    nextItemIndex,
  };

  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
}

function getMaxDepth({ previousItem }: { previousItem: FlattenedItem }) {
  return previousItem ? previousItem.depth + 1 : 0;
}

function getMinDepth({ nextItem }: { nextItem: FlattenedItem }) {
  return nextItem ? nextItem.depth : 0;
}

const flattenedToObject = (items: FlattenedItem[]) => {
  const tree: FlatTree = {};

  items.forEach((item) => {
    tree[item.id] = item;
  });

  return tree;
};

function flatten({
  items,
  parentId = null,
  depth = 0,
  initial,
  oldTree,
}: {
  items: TreeItems;
  parentId?: UniqueIdentifier | null;
  depth?: number;
  initial?: boolean;
  oldTree?: FlatTree;
}): FlattenedItem[] {
  return items.reduce<FlattenedItem[]>((acc, item, index) => {
    const oldItem = oldTree?.[item.id];
    let collapsed = item.collapsed;

    if (initial) {
      collapsed = true;
    } else if (oldItem && oldItem.collapsed !== undefined) {
      collapsed = oldItem.collapsed;
    }

    return [
      ...acc,
      { ...item, parentId, depth, index, collapsed },
      ...flatten({
        items: item.items || [],
        parentId: item.id,
        depth: depth + 1,
        initial,
        oldTree,
      }),
    ];
  }, []);
}

export function flattenTree({
  items,
  initial,
  oldTree,
}: {
  items: TreeItems;
  initial?: boolean;
  oldTree?: FlatTree;
}) {
  const flattenedItems = flatten({ items, initial, oldTree });
  const tree = flattenedToObject(flattenedItems);

  return { items: flattenedItems, tree };
}

export function buildTree(
  flattenedItems: FlattenedItem[],
  model: FormalizedModel,
  oldTree: FlatTree = {}
): { items: TreeItems; tree: FlatTree } {
  const root: TreeItem = { ...JSON.parse(JSON.stringify(model)), items: [] };

  const nodes: FlatTree = { [root.id]: root };
  const _items = flattenedItems.map((item) => ({ ...item, items: [] }));

  for (const _item of _items) {
    const item = { ..._item };

    const { id, items, accepts } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(_items, parentId);

    if (!parent.items) {
      parent.items = [];
    }

    // See if we have saved state values to copy over
    const oldItem = oldTree[id];

    if (oldItem) {
      item.collapsed = oldItem.collapsed;
    }

    nodes[id] = {
      id,
      items,
      accepts,
      collapsed: item.collapsed,
      type: item.type,
    };

    parent.items.push(item);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { items: root.items, tree: nodes }!;
}

export function findItem(items: TreeItem[], itemId: UniqueIdentifier) {
  return items.find(({ id }) => id === itemId);
}

export function findItemDeep(items: TreeItems, itemId: UniqueIdentifier): TreeItem | undefined {
  for (const item of items) {
    const { id, items } = item;

    if (id === itemId) {
      return item;
    }

    if (items?.length) {
      const child = findItemDeep(items, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
}

export function removeItem(items: TreeItems, id: UniqueIdentifier) {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) {
      continue;
    }

    if (item.items?.length) {
      item.items = removeItem(item.items, id);
    }

    newItems.push(item);
  }

  return newItems;
}

export function setProperty<T extends keyof TreeItem>(
  items: TreeItems,
  id: UniqueIdentifier,
  property: T,
  setter: (value: TreeItem[T]) => TreeItem[T]
) {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }

    if (item.items?.length) {
      item.items = setProperty(item.items, id, property, setter);
    }
  }

  return [...items];
}

function countChildren(items: TreeItem[], count = 0): number {
  return items.reduce((acc, { items }) => {
    if (items?.length) {
      return countChildren(items, acc + 1);
    }

    return acc + 1;
  }, count);
}

export function getChildCount(items: TreeItems, id: UniqueIdentifier) {
  const item = findItemDeep(items, id);

  return item ? countChildren(item.items || []) : 0;
}

export function removeChildrenOf(items: FlattenedItem[], ids: UniqueIdentifier[]) {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.items?.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
}

type CheckDisallowedMoveProps = {
  items: FlattenedItem[];
  activeItem?: FlattenedItem | null;
  model?: FormalizedModel;
  parentId?: UniqueIdentifier | null;
};

export const checkDisallowedMove = ({
  items,
  parentId,
  activeItem,
  model,
}: CheckDisallowedMoveProps) => {
  let isDisallowedMove = false;

  if (model && activeItem) {
    const parentItemIndex = items.findIndex(({ id }) => id === parentId);
    const parentItem = items[parentItemIndex];
    const accepts = parentItem ? parentItem.accepts : model.accepts;
    const isAccepted = accepts?.includes(activeItem.type);

    isDisallowedMove = !isAccepted;
  }

  return isDisallowedMove;
};
