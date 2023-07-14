import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

type WrapperProps = {
  active?: boolean;
  tabid: number;
};

export const Wrapper = styled(IconButton)<WrapperProps>`
  display: block;
  top: ${({ tabid }) => (tabid - 1) * 32};
  position: relative;
  line-height: 0;
  z-index: 20;
  margin-bottom: 8px;
`;
