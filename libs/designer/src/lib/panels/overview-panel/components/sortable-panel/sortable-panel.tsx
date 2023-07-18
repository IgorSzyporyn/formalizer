import {
  Announcements,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardCoordinateGetter,
  KeyboardSensor,
  MeasuringConfiguration,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
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
  SortingStrategy,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { FormalizedModel } from '@formalizer/core';
import { useListener } from '@formalizer/react';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRange } from '../../utilities/create-range';
import { SortablePanelItem } from '../sortable-panel-item/sortable-panel-item';
import { SortablePanelList } from '../sortable-panel-list/sortable-panel-list';
import { SortablePanelWrapper } from '../sortable-panel-wrapper/sortable-panel-wrapper';

export type SortablePanelProps = {
  columns?: number;
  model: FormalizedModel;
  activationConstraint?: PointerActivationConstraint;
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  collisionDetection?: CollisionDetection;
  coordinateGetter?: KeyboardCoordinateGetter;
  dropAnimation?: DropAnimation | null;
  getNewIndex?: NewIndexGetter;
  measuring?: MeasuringConfiguration;
  modifiers?: Modifiers;
  reorderItems?: typeof arrayMove;
  strategy?: SortingStrategy;
  style?: CSSProperties;
  useDragOverlay?: boolean;
  isDisabled?(id: UniqueIdentifier): boolean;
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
  activationConstraint,
  animateLayoutChanges,
  adjustScale = false,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  getNewIndex,
  isDisabled = () => false,
  measuring,
  modifiers,
  reorderItems = arrayMove,
  strategy = rectSortingStrategy,
  style,
  columns,
  model,
  useDragOverlay = true,
}: SortablePanelProps) => {
  const isFirstAnnouncement = useRef(true);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const modelItems = model.items || [];
  const modelCount = modelItems.length || 0;
  const [modelIndexes, setModelIndexes] = useState(() =>
    createRange<UniqueIdentifier>(modelCount, (index: number) => index + 1)
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter,
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
        return `Sortable item ${
          active.id
        } was moved into position ${getPosition(over.id)} of ${
          modelIndexes.length
        }`;
      }

      return;
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${
          active.id
        } was dropped at position ${getPosition(over.id)} of ${
          modelIndexes.length
        }`;
      }

      return;
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id
      )} of ${modelIndexes.length}.`;
    },
  };

  const listener = useListener(model);

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  useEffect(() => {
    if (listener.property === 'items') {
      setModelIndexes(
        createRange<UniqueIdentifier>(modelCount, (index: number) => index + 1)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listener]);

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
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
            const newModelIndexes = reorderItems(
              modelIndexes,
              activeIndex,
              overIndex
            );

            const newModels = newModelIndexes.map((value) => {
              return modelItems[(value as number) - 1];
            });
            setModelIndexes(newModelIndexes);
            model.items = newModels;
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <SortablePanelWrapper style={style} center>
        <SortableContext items={modelIndexes} strategy={strategy}>
          <SortablePanelList columns={columns}>
            {modelIndexes.map((value, index) => (
              <SortableItem
                key={value}
                id={value}
                model={modelItems[(value as number) - 1]}
                index={index}
                disabled={isDisabled(value)}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                getNewIndex={getNewIndex}
              />
            ))}
          </SortablePanelList>
        </SortableContext>
      </SortablePanelWrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                <SortablePanelItem
                  model={modelItems[activeIndex]}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
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
}

function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  id,
  index,
  useDragOverlay,
  model,
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
    animateLayoutChanges,
    disabled,
    getNewIndex,
  });

  return (
    <SortablePanelItem
      ref={setNodeRef}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      model={model}
      index={index}
      transform={transform}
      transition={transition}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}
