import styled from '@emotion/styled';

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
