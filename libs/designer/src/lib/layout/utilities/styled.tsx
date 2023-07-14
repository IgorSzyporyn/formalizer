import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';
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

export const Content = styled(motion.div)`
  height: 100%;
  width: 500px;
  position: relative;
`;

export const AnimatedContentPanel = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Tabs = styled(Paper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 0;
`;

export const CollapseTab = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const CollapseIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  margin-bottom: 32px;
`;

export const UtilityTabs = styled.ul`
  position: relative;
  margin: 0;
  list-style: none;
  padding: 0;
  z-index: 10;
`;

export const AnimatedBox = styled(motion.div)`
  position: absolute;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  z-index: 10;
`;
