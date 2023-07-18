import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ContentMotion = styled(motion.div)`
  height: 100%;
  overflow: hidden;
`;

export const ContentMotionInner = styled.div`
  position: relative;
  height: 100%;
  width: 500px;
`;

export const ContentMotionChild = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;
