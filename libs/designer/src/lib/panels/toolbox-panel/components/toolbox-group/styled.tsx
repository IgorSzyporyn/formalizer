import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Wrapper = styled.div``;

export const Content = styled(motion.div)``;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(82px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 16px;
  padding: 16px 0 32px 19px;

  &:before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > * > * {
    height: 100%;
  }
`;
