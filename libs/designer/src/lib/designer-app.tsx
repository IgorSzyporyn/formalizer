import { Box } from '@mui/material';
import { Utilities } from './layout/utilities/utilities';
import { Main } from './layout/main/main';

export const DesignerApp = () => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
      <Box sx={{ flexGrow: '1', height: '100%', ml: 3, mr: 3 }}>
        <Main />
      </Box>
      <Box sx={{ height: '100%' }}>
        <Utilities />
      </Box>
    </Box>
  );
};

// <Header />
