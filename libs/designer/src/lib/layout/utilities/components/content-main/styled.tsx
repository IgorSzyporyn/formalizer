import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { motion } from 'framer-motion';

export const Wrapper = styled(Paper)`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
`;

export const ContentMotion = styled(motion.div)`
  height: 100%;
`;
