import styled from '@emotion/styled';
import { Panel } from '@formalizer/components';
import { Box, Typography } from '@mui/material';

export const Wrapper = styled(Panel)`
  overflow: hidden;

  & svg {
    font-size: 26px;
  }
`;

export const Header = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
  flex-grow: 1;
  justify-content: space-between;
`;

export const Main = styled(Box)``;

export const Optional = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  align-self: stretch;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  line-height: 0;
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.div``;

const BaseText = styled(Typography)`
  margin: 0;
  line-height: 1;
`;

export const Title = styled(BaseText)`
  line-height: 1.4;
  font-weight: 500;
  font-size: 14px;
`;

export const Subtitle = styled(BaseText)`
  font-size: 11px;
  font-weight: 300;
  line-height: 1.1;
`;
