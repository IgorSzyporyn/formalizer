import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';

export const TreeWrapper = styled(motion.li)`
  list-style: none;
  box-sizing: border-box;
  margin-bottom: -1px;

  &.designer-layer-card-wrapper--clone {
    display: inline-block;
    pointer-events: none;
    padding: 0;
    padding-left: 10px;
    padding-top: 5px;
  }

  &:hover {
    & .designer-layer-card__focus-button,
    & .designer-layer-card__properties-button,
    & .designer-layer-card__remove-button {
      visibility: visible;
    }
  }
`;

export const TreeItem = styled(motion.div)`
  --vertical-padding: 4px;
  position: relative;
  padding: var(--vertical-padding) 0px;
  box-sizing: border-box;

  &.designer-layer-card--clone {
    --vertical-padding: 5px;
    padding-right: 32px;
    opacity: 0;
  }

  &.designer-layer-card--ghost {
    opacity: 0.4;
  }
`;

export const TreeItemCardPanel = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

export const CardButtons = styled(motion.div)`
  display: flex;
  align-items: center;
`;
