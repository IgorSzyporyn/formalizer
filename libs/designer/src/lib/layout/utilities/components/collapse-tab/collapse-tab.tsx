import { useContext } from 'react';
import * as Styled from './styled';
import { DesignerUiContext } from '../../../../context';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { Variants } from 'framer-motion';
import { IconButton } from '@mui/material';

const iconCollapseVariants: Variants = {
  open: { rotateY: 0 },
  closed: { rotateY: 180 },
};

export const CollapseTab = () => {
  const { utilitiesCollapsed, updateUiContext } = useContext(DesignerUiContext);

  const handleCollapseToggle = () => {
    updateUiContext({ utilitiesCollapsed: !utilitiesCollapsed });
  };

  return (
    <Styled.CollapseIcon
      animate={utilitiesCollapsed ? 'closed' : 'open'}
      variants={iconCollapseVariants}
    >
      <IconButton onClick={handleCollapseToggle}>
        <DoubleArrowIcon />
      </IconButton>
    </Styled.CollapseIcon>
  );
};
