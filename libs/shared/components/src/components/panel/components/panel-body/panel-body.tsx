import { BoxProps } from '@mui/material';
import { ReactNode } from 'react';
import * as Styled from './styled';

type PanelBodyProps = {
  children: ReactNode;
} & BoxProps;

export const PanelBody = ({ children, ...rest }: PanelBodyProps) => {
  return (
    <Styled.Wrapper {...rest}>
      <Styled.Inner sx={{ p: 2, pl: 3, pr: 3 }}>{children}</Styled.Inner>
    </Styled.Wrapper>
  );
};
