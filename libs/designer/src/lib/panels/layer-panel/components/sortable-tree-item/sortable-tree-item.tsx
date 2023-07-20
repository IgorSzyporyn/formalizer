import type { UniqueIdentifier } from '@dnd-kit/core';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

import { TreeItem, TreeItemProps } from '../tree-item/tree-item';

interface SortableTreeItemProps extends TreeItemProps {
  id: UniqueIdentifier;
  modelId: string;
}

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
  isSorting || wasDragging ? false : true;

export function SortableTreeItem({ id, depth, modelId, ...props }: SortableTreeItemProps) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Item = TreeItem as any;

  return (
    <Item
      modelId={modelId}
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      depth={depth}
      ghost={isDragging}
      disableInteraction={isSorting}
      style={isSorting || isDragging ? style : {}}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  );
}
