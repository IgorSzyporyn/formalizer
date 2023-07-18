import cx from 'classnames';
import { CSSProperties, ReactNode, forwardRef } from 'react';
import * as Styled from './styled';

export type SortablePanelListProps = {
  children: ReactNode;
  columns?: number;
  style?: CSSProperties;
  horizontal?: boolean;
};

export const SortablePanelList = forwardRef<
  HTMLUListElement,
  SortablePanelListProps
>(
  (
    { children, columns = 1, horizontal, style }: SortablePanelListProps,
    ref
  ) => {
    const className = cx('sortable-panel-list', {
      'sortable-panel-list--horizontal': horizontal,
    });

    return (
      <Styled.Wrapper
        ref={ref}
        style={{ ...style, '--columns': columns } as CSSProperties}
        className={className}
      >
        {children}
      </Styled.Wrapper>
    );
  }
);
