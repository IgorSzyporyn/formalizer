import cx from 'classnames';
import { CSSProperties, ReactNode, forwardRef } from 'react';
import * as Styled from './styled';

export type SortablePanelListProps = {
  children: ReactNode;
  columns?: number;
  style?: CSSProperties;
  horizontal?: boolean;
  itemWidth: number;
  gap: number;
  itemHeight: number;
};

export const SortablePanelList = forwardRef<HTMLUListElement, SortablePanelListProps>(
  (
    {
      children,
      columns = 1,
      horizontal,
      style,
      itemWidth,
      itemHeight,
      gap,
    }: SortablePanelListProps,
    ref
  ) => {
    const className = cx('sortable-panel-list', {
      'sortable-panel-list--horizontal': horizontal,
    });

    return (
      <Styled.Wrapper
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns,
            minWidth: itemWidth,
            minHeight: itemHeight,
            gridGap: gap,
          } as CSSProperties
        }
        className={className}
      >
        {children}
      </Styled.Wrapper>
    );
  }
);
