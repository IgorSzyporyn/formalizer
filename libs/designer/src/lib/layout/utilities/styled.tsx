import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ContentMotion = styled(motion.div)`
  height: 100%;
`;

export const ContentMotionInner = styled.div`
  position: relative;
  height: 100%;
  width: 500px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ContentMotionChild = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
