import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';

export const FocusButton = styled(IconButton)`
  visibility: hidden;
`;

export const PropertiesButton = styled(IconButton)`
  visibility: hidden;
`;

export const RemoveButton = styled(IconButton)`
  visibility: hidden;
`;

export const TreeWrapper = styled.li`
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

export const TreeItem = styled.div`
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

export const TreeItemInner = styled.div`
  position: relative;
`;

export const TreemItemEditPanel = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.palette.error.dark};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  background-image: linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07));
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
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
