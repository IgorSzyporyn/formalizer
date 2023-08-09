import {
  Announcements,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  ScreenReaderInstructions,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  AnimateLayoutChanges,
  NewIndexGetter,
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { FormalizedModel } from '@formalizer/core';
import { useListener } from '@formalizer/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRange } from '../../../utils/create-range';
import { SortablePanelItem } from '../sortable-panel-item/sortable-panel-item';
import { SortablePanelList } from '../sortable-panel-list/sortable-panel-list';
import { SortablePanelWrapper } from '../sortable-panel-wrapper/sortable-panel-wrapper';

export type SortablePanelProps = {
  columns?: number;
  model: FormalizedModel;
  itemHeight: number;
  itemWidth: number;
  gap: number;
};

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};

export const SortablePanel = ({
  columns,
  model,
  itemHeight,
  itemWidth,
  gap,
}: SortablePanelProps) => {
  const isFirstAnnouncement = useRef(true);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const modelItems = model.items || [];
  const modelCount = modelItems.length || 0;
  const [modelIndexes, setModelIndexes] = useState(() =>
    createRange<UniqueIdentifier>(modelCount, (index: number) => index + 1)
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getIndex = (id: UniqueIdentifier) => modelIndexes.indexOf(id);
  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1;
  const activeIndex = activeId ? getIndex(activeId) : -1;

  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id
      )}. Sortable item ${id} is in position ${getPosition(id)} of ${
        modelIndexes.length
      }`;
    },
    onDragOver({ active, over }) {
      // In this specific use-case, the picked up item's `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn't need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false;
        return;
      }

      if (over) {
        return `Sortable item ${active.id} was moved into position ${getPosition(
          over.id
        )} of ${modelIndexes.length}`;
      }

      return;
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${active.id} was dropped at position ${getPosition(
          over.id
        )} of ${modelIndexes.length}`;
      }

      return;
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id
      )} of ${modelIndexes.length}.`;
    },
  };

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  useListener({ model, id: 'sortable-panel' });

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }

        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        setActiveId(null);

        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            const newModelIndexes = arrayMove(modelIndexes, activeIndex, overIndex);

            const newModels = newModelIndexes.map((value) => {
              return modelItems[(value as number) - 1];
            });
            setModelIndexes(newModelIndexes);
            model.items = newModels;
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortablePanelWrapper center>
        <SortableContext items={modelIndexes} strategy={rectSortingStrategy}>
          <SortablePanelList
            columns={columns}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            gap={gap}
          >
            {modelIndexes.map((value, index) => (
              <SortableItem
                key={value}
                id={value}
                itemHeight={itemHeight}
                itemWidth={itemWidth}
                model={modelItems[(value as number) - 1]}
                index={index}
                useDragOverlay={true}
              />
            ))}
          </SortablePanelList>
        </SortableContext>
      </SortablePanelWrapper>
      {createPortal(
        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeId ? (
            <SortablePanelItem
              model={modelItems[activeIndex]}
              itemWidth={itemWidth}
              itemHeight={itemHeight}
              dragOverlay
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  id: UniqueIdentifier;
  index: number;
  model: FormalizedModel;
  useDragOverlay?: boolean;
  itemHeight: number;
  itemWidth: number;
}

function SortableItem({
  id,
  index,
  useDragOverlay,
  model,
  itemHeight,
  itemWidth,
}: SortableItemProps) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  return (
    <SortablePanelItem
      ref={setNodeRef}
      dragging={isDragging}
      sorting={isSorting}
      model={model}
      index={index}
      transform={transform}
      transition={transition}
      listeners={listeners}
      itemHeight={itemHeight}
      itemWidth={itemWidth}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}
