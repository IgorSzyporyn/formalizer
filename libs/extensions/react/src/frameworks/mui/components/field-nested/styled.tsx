import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const MotionDiv = styled(motion.div)`
  &.field {
    &__content {
      &--horizontal > * {
        margin-right: 16px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;
