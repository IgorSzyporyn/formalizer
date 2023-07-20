import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:last-child {
    cursor: default;

    & > svg {
      display: none;
    }
  }
`;
