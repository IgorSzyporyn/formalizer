import styled from '@emotion/styled';

type InputProps = {
  $fullWidth?: boolean;
};

export const Select = styled.select<InputProps>`
  ${({ $fullWidth }) =>
    $fullWidth
      ? `
    flex-grow: 1;
  `
      : null}
`;

export const Option = styled.option``;

export const Label = styled.label``;
