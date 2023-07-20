import { CSSProperties, forwardRef, memo, useEffect } from 'react';
import cx from 'classnames';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';
import * as Styled from './styled';
import { FormalizedModel } from '@formalizer/core';
import { OverviewForm } from '../../overview-form/overview-form';

export interface SortablePanelItemProps {
  dragOverlay?: boolean;
  dragging?: boolean;
  model: FormalizedModel;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: CSSProperties;
  handleRef?: (element: HTMLElement | null) => void;
  transition?: string | null;
  wrapperStyle?: CSSProperties;
  itemWidth: number;
  itemHeight: number;
}

export const SortablePanelItem = memo(
  forwardRef<HTMLLIElement, SortablePanelItemProps>(
    (
      {
        dragOverlay,
        dragging,
        fadeIn,
        handleRef,
        index,
        listeners,
        sorting,
        model,
        style,
        transition,
        transform,
        wrapperStyle,
        itemHeight,
        itemWidth,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      const wrapperClassName = cx('sortable-panel-item-wrapper', {
        'sortable-panel-item-wrapper--fade-in': fadeIn,
        'sortable-panel-item-wrapper--sorting': sorting,
        'sortable-panel-item-wrapper--drag-overlay': dragOverlay,
      });

      const contentClassName = cx('sortable-panel-item-content', {
        'sortable-panel-item-content--drag-overlay': dragOverlay,
        'sortable-panel-item-content--dragging': dragging,
      });

      return (
        <Styled.Wrapper
          className={wrapperClassName}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition].filter(Boolean).join(', '),
              '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
              '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
              '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
              '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
              '--index': index,
            } as CSSProperties
          }
          ref={ref}
        >
          <Styled.Content className={contentClassName} style={style} {...props} tabIndex={0}>
            <OverviewForm
              model={model}
              width={itemWidth}
              height={itemHeight}
              handleProps={handleRef ? { ...listeners, ref: handleRef } : undefined}
            />
          </Styled.Content>
        </Styled.Wrapper>
      );
    }
  )
);
