import styled from '@emotion/styled';
import './keyframes.css';

const focusedOutlineColor = '#4c9ffe';
const boxShadowBorder = '0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05)';
const boxShadowCommon = '0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15)';
const boxShadow = `${boxShadowBorder},${boxShadowCommon}`;

export const Wrapper = styled.li`
  display: flex;
  box-sizing: border-box;
  transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1))
    scaleY(var(--scale-y, 1));
  transform-origin: 0 0;
  touch-action: manipulation;

  &.sortable-panel-item-wrapper--fade-in {
    animation: fadeIn 500ms ease;
  }

  &.sortable-panel-item-wrapper--drag-overlay {
    --scale: 1.05;
    --box-shadow: ${boxShadow};
    --box-shadow-picked-up: ${boxShadowBorder}, -1px 0 15px 0 rgba(34, 33, 81, 0.01),
      0px 15px 15px 0 rgba(34, 33, 81, 0.25);
    z-index: 999;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  box-sizing: border-box;
  list-style: none;
  transform-origin: 50% 50%;

  -webkit-tap-highlight-color: transparent;

  touch-action: manipulation;
  cursor: grab;

  transform: scale(var(--scale, 1));
  transition: box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);

  &:focus-visible {
    box-shadow: 0 0px 4px 1px ${focusedOutlineColor}, ${boxShadow};
  }

  &.sortable-panel-item-content--dragging:not(.sortable-panel-item-content--drag-overlay) {
    opacity: var(--dragging-opacity, 0.5);
    z-index: 0;

    &:focus {
      box-shadow: ${boxShadow};
    }
  }

  &.sortable-panel-item-content--drag-overlay {
    cursor: inherit;
    /* box-shadow: 0 0px 6px 2px $focused-outline-color; */
    animation: pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
    transform: scale(var(--scale));
    box-shadow: var(--box-shadow-picked-up);
    opacity: 1;
  }

  &.color:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 100%;
    width: 3px;
    display: block;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: var(--color);
  }
`;
