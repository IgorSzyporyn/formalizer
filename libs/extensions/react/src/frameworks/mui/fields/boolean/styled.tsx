import styled from '@emotion/styled';

type InputProps = {
  $fullWidth?: boolean;
  $inline?: boolean;
};

export const Input = styled.input<InputProps>`
  ${({ $fullWidth }) =>
    $fullWidth
      ? `
    flex-grow: 1;
  `
      : null}
`;

export const Label = styled.label``;
