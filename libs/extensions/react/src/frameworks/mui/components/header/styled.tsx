import styled from '@emotion/styled';
import { Box, IconButton, Typography } from '@mui/material';

export const Wrapper = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Main = styled(Box)``;

export const Info = styled(Box)`
  display: flex;
  align-items: center;
`;

export const Title = styled(Typography)``;

export const Description = styled(Typography)``;

export const Hint = styled(Typography)``;

export const Action = styled(Box)`
  display: flex;
  align-items: center;
`;

export const AnimatedCollapse = styled(Box)`
  transition: all 175ms ease-in-out;
`;

export const CollapseButton = styled(IconButton)``;
