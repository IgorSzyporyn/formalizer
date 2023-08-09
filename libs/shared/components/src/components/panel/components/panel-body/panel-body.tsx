import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

type PanelBodyProps = {
  children: ReactNode;
  noPadding?: boolean;
} & BoxProps;

export const PanelBody = ({
  children,
  noPadding,
  sx: _sx = {},
  ...rest
}: PanelBodyProps) => {
  const sx = noPadding ? _sx : { p: 2, pl: 3, pr: 3, ..._sx };

  return (
    <Box {...rest} sx={sx}>
      {children}
    </Box>
  );
};
