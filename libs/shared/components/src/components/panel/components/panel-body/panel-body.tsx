import { BoxProps } from '@mui/material';
import { ReactNode } from 'react';
import * as Styled from './styled';

type PanelBodyProps = {
  children: ReactNode;
  noPadding?: boolean;
} & BoxProps;

export const PanelBody = ({ children, noPadding, sx = {}, ...rest }: PanelBodyProps) => {
  const innerSx = noPadding ? sx : { p: 2, pl: 3, pr: 3, ...sx };

  return (
    <Styled.Wrapper {...rest}>
      <Styled.Inner sx={innerSx}>{children}</Styled.Inner>
    </Styled.Wrapper>
  );
};
