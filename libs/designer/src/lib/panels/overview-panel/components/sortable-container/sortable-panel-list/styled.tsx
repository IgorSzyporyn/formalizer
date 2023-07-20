import styled from '@emotion/styled';

export const Wrapper = styled.ul`
  display: grid;
  grid-auto-rows: max-content;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 350ms ease;
  grid-template-columns: repeat(var(--columns, 1), 1fr);

  &:after {
    content: '';
    height: 10px;
    grid-column-start: span var(--columns, 1);
  }

  &.sortable-panel-list--horizontal {
    width: 100%;
    grid-auto-flow: column;
  }
`;
