import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';

export const Wrapper = styled(Paper)`
  height: 100%;
  display: flex;
  overflow: hidden;
`;

export const UtilityBar = styled(Paper)`
  border-radius: 0;
  box-shadow: none;
  z-index: 20;
  overflow: hidden;
`;

export const Main = styled.div`
  height: 100%;
  z-index: 10;
  overflow: hidden;
`;
