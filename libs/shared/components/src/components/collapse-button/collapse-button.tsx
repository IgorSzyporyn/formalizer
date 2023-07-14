import { ChevronRight } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import { ReactNode } from 'react';

type CollapseButtonProps = {
  children?: ReactNode;
  collapsed?: boolean;
  onCollapseToggle?: () => void;
} & IconButtonProps;

export const CollapseButton = ({
  collapsed,
  onCollapseToggle,
  ...rest
}: CollapseButtonProps) => {
  return (
    <IconButton {...rest} onClick={onCollapseToggle}>
      <ChevronRight
        sx={{
          transform: collapsed ? 'rotate(0)' : 'rotate(90deg)',
          transition: 'all 0.175s ease-in-out',
        }}
      />
    </IconButton>
  );
};
