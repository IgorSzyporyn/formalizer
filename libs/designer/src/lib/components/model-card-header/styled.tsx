import styled from '@emotion/styled';
import { CardHeader } from '@mui/material';

export const Wrapper = styled(CardHeader)`
  &.model-card-header--small {
    .MuiCardHeader-avatar {
      margin-right: 0.5rem;
    }
  }

  &.model-card-header--medium {
    .MuiCardHeader-avatar {
      margin-right: 1rem;
    }
  }

  &.model-card-header--large {
    .MuiCardHeader-avatar {
      margin-right: 1rem;
    }
  }
`;
