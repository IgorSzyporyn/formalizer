import styled from '@emotion/styled';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
  cursor: grab;
`;

export const Content = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & {
    transition: background-color 250ms ease-in-out;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const Title = styled(Typography)`
  margin: 0,
  line-height: 1;
  font-size: 10px;
`;

export const Icon = styled(Box)`
  line-height: 0;

  & svg {
    font-size: 26px;
  }
`;
