import { BoxProps } from '@mui/material';
import { ReactNode } from 'react';
import * as Styled from './styled';

type PanelBodyProps = {
  children: ReactNode;
} & BoxProps;

export const PanelBody = ({ children, sx = {}, ...rest }: PanelBodyProps) => {
  return (
    <Styled.Wrapper {...rest}>
      <Styled.Inner sx={{ pl: 2, pr: 2 }}>{children}</Styled.Inner>
    </Styled.Wrapper>
  );
};
