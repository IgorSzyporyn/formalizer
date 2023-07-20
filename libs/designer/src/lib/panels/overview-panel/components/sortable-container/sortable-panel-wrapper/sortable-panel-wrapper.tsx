import cx from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import * as Styled from './styled';

type SortablePanelWrapperProps = {
  children: ReactNode;
  center?: boolean;
  style?: CSSProperties;
};

export function SortablePanelWrapper({ children, center, style }: SortablePanelWrapperProps) {
  const className = cx('sortable-panel-wrapper', {
    'sortable-panel-wrapper--center': center,
  });

  return (
    <Styled.Wrapper className={className} style={style}>
      {children}
    </Styled.Wrapper>
  );
}
