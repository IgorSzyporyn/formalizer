import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const AnimatedBox = styled(motion.div)`
  position: absolute;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  z-index: 10;
`;

export const UtilityTabs = styled.ul`
  position: relative;
  margin: 0;
  list-style: none;
  padding: 0;
  z-index: 10;
`;
