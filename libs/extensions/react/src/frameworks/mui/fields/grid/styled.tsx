import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Wrapper = styled(Box)``;

type ContentProps = {
  columns: number;
};

export const Content = styled(Box)<ContentProps>`
  display: grid;
  grid-template-columns: ${({ columns }) => ' 1fr'.repeat(columns)};
`;
