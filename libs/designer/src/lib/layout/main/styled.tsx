import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Header = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: -1;
`;

export const Content = styled(motion.div)`
  height: 100%;
  z-index: 200;
`;

export const Text = styled.div``;

export const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  line-height: 1;
`;

export const Subtitle = styled.h2`
  margin: 0;
  font-size: 11px;
  line-height: 0.9;
  font-weight: 400;
`;
