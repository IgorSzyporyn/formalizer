import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import * as Styled from './styled';

import { Box, BoxProps, IconButton } from '@mui/material';
import { Variants } from 'framer-motion';

type CollapseTabProps = {
  direction?: 'vertical' | 'horizontal';
  onCollapseToggle: () => void;
  collapsed: boolean;
} & BoxProps;

export const CollapseTab = ({
  direction = 'horizontal',
  sx = {},
  collapsed,
  onCollapseToggle,
  ...props
}: CollapseTabProps) => {
  const isVertical = direction === 'vertical';

  const iconCollapseVariants: Variants = isVertical
    ? {
        open: { rotate: 90 },
        closed: { rotate: -90 },
      }
    : {
        open: { rotate: 0 },
        closed: { rotate: 180 },
      };

  const handleCollapseToggle = () => {
    onCollapseToggle();
  };

  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        height: 32,
        width: 32,
        ...sx,
      }}
    >
      <Styled.CollapseIcon
        animate={collapsed ? 'closed' : 'open'}
        variants={iconCollapseVariants}
      >
        <IconButton onClick={handleCollapseToggle}>
          <DoubleArrowIcon />
        </IconButton>
      </Styled.CollapseIcon>
    </Box>
  );
};
