import {
  Announcements,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormalizedModel } from '@formalizer/core';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FlatTree, FlattenedItem, TreeItem } from '../../typings/sortable-tree-types';
import { sortableTreeKeyboardCoordinates } from '../../utils/keyboard-coordinates';
import {
  buildTree,
  flattenTree,
  getProjection,
  removeChildrenOf,
  removeItem,
  setProperty,
} from '../../utils/sortable-tree';
import { SortableTreeItem } from '../sortable-tree-item/sortable-tree-item';
import * as Styled from './styled';
import { FormalizerContext } from '../../../../context/designer-context';
import { useListener } from '@formalizer/react';

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5,
        }),
      },
    ];
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing,
    });
  },
};

type SortableTreeProps = {
  collapsible?: boolean;
  indentationWidth?: number;
  removable?: boolean;
  model?: FormalizedModel;
};

export function SortableTree({ collapsible, indentationWidth = 32, model }: SortableTreeProps) {
  const initial = useRef(true);

  const formalizer = useContext(FormalizerContext);
  const modelJSON = formalizer?.getModelJSON(model?.id) as TreeItem;

  const oldTree = useRef<FlatTree>({});

  const [treeItems, setTreeItems] = useState<TreeItem[]>(modelJSON.items || []);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const [currentPosition, setCurrentPosition] = useState<{
    parentId: UniqueIdentifier | null;
    overId: UniqueIdentifier;
  } | null>(null);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree({
      items: treeItems,
      initial: initial.current,
      oldTree: oldTree.current,
    });

    initial.current = false;
    oldTree.current = flattenedTree.tree;

    const collapsedItems = flattenedTree.items.reduce<UniqueIdentifier[]>(
      (acc, { items, collapsed, id }) => {
        return collapsed && items && items.length ? [...acc, id] : acc;
      },
      []
    );

    const flattenedChildren = removeChildrenOf(
      flattenedTree.items,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    );

    return flattenedChildren;
  }, [activeId, treeItems]);

  const projected =
    activeId && overId
      ? getProjection(flattenedItems, activeId, overId, offsetLeft, indentationWidth, model)
      : null;

  const sensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });

  const [coordinateGetter] = useState(() =>
    sortableTreeKeyboardCoordinates(sensorContext, indentationWidth)
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);
  const activeItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null;

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  const announcements: Announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`;
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement('onDragMove', active.id, over?.id);
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement('onDragOver', active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement('onDragEnd', active.id, over?.id);
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`;
    },
  };

  const listener = useListener(model);

  useEffect(() => {
    setTreeItems(formalizer?.getModelJSON(model?.id).items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listener]);

  return (
    <DndContext
      accessibility={{ announcements }}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Styled.Wrapper>
        <SortableContext items={sortedIds} strategy={rectSortingStrategy}>
          {flattenedItems.map((flattenedItem) => {
            const { id, items: _items, depth, collapsed } = flattenedItem;
            const itemDepth = id === activeId && projected ? projected.depth : depth;
            // itemDepth = allowedMove ? itemDepth : depth;

            return (
              <SortableTreeItem
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                modelId={id as any}
                key={`sortable-tree-item-${id}`}
                id={id}
                collapsed={collapsed}
                depth={itemDepth}
                indentationWidth={indentationWidth}
                disallowedMove={projected?.disallowedMove}
                onCollapse={
                  collapsible && _items && _items.length ? () => handleCollapse(id) : undefined
                }
                onRemove={() => {
                  handleRemove(id);
                }}
              />
            );
          })}
          {createPortal(
            <DragOverlay dropAnimation={dropAnimationConfig}>
              {activeId && activeItem ? (
                <SortableTreeItem
                  key={`sortable-tree-item-clone-${activeId}`}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  modelId={activeId as any}
                  id={activeId}
                  depth={activeItem.depth}
                  clone
                  indentationWidth={indentationWidth}
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </SortableContext>
      </Styled.Wrapper>
    </DndContext>
  );

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const { items: clonedItems } = flattenTree({ items: treeItems, oldTree: oldTree.current });
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      if (model && !projected.disallowedMove) {
        const previousItem = projected.previousItem;
        const previousIsParent = previousItem.id === parentId;
        let newIndex = 0;

        if (!previousIsParent) {
          const parentModel = formalizer?.getModel(parentId as string);

          parentModel?.items?.some((item, index) => {
            const isFound = item.id === previousItem.id;
            newIndex = isFound ? index + 1 : newIndex;
            return isFound;
          });
        }

        formalizer?.moveModel(active.id as string, parentId as string, newIndex);
        const { items: newItems } = buildTree(sortedItems, model, oldTree.current);
        setTreeItems(newItems);
      } else if (projected.disallowedMove) {
        resetState();
      }
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function handleRemove(id: UniqueIdentifier) {
    setTreeItems((items) => removeItem(items, id));
  }

  function handleCollapse(id: UniqueIdentifier) {
    oldTree.current[id].collapsed = !oldTree.current[id].collapsed;

    setTreeItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        return !value;
      })
    );
  }

  function getMovementAnnouncement(
    eventName: string,
    activeId: UniqueIdentifier,
    overId?: UniqueIdentifier
  ) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          });
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree({ items: treeItems, oldTree: oldTree.current }).items)
      );

      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: UniqueIdentifier | null = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }
}
