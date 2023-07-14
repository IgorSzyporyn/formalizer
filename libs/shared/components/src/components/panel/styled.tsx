import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';

export const Wrapper = styled(Paper)`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

export const UtilityBar = styled(Paper)`
  border-radius: 0;
  box-shadow: none;
  z-index: 20;
`;

export const Main = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 10;
`;
