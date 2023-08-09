import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  width: 100vw;
  height: 100vh;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 10;
`;

export const Header = styled.div`
  height: 96px;
  display: flex;
`;

export const Canvas = styled.div`
  flex-grow: 1;
  overflow: hidden;
  position: relative;
`;



export const Slider = styled(motion.div)`
  position: fixed;
  height: 100%;
  width: 5px;
  right: 44px;
  background-color: green;
  z-index: 30;
`;

export const Utility = styled(motion.div)`
  position: relative;
  display: flex;
  top: 0;
  right: 0;
  min-height: 100vh;
  width: 44px;
  height: 100%;
  background-color: purple;
  z-index: 20;
`;

export const Bar = styled.div`
  height: 100%;
  background-color: cyan;
  width: 44px;
  min-width: 44px;
`;

export const Content = styled.div`
  height: 100%;
  background-color: blue;
  flex-grow: 1;
`;
