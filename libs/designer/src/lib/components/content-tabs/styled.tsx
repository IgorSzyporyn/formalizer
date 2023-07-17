import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';

type WrapperProps = {
  direction: 'horizontal' | 'vertical';
};

export const Wrapper = styled.ul<WrapperProps>`
  position: relative;
  margin: 0;
  list-style: none;
  padding: 0;
  z-index: 10;

  ${({ direction }) =>
    direction === 'horizontal'
      ? `
    display: flex;
    align-items: center;
  `
      : null}
`;

export const AnimatedBox = styled(motion.div)`
  position: absolute;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  z-index: 10;
`;

export const Tab = styled(IconButton)`
  display: block;
  position: relative;
  line-height: 0;
  z-index: 20;
`;
