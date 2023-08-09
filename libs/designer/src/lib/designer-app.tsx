import { Box } from '@mui/material';
import { Main } from './layout/main/main';
import { Utilities } from './layout/utilities/utilities';

export const DesignerApp = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        flexGrow: 1,
        height: '100vh',
        width: '100vw',
        gap: 2,
        gridTemplateColumns: 'minmax(0, 1fr) auto',
      }}
    >
      <Box sx={{ height: '100%' }}></Box>
      <Box sx={{ height: '100%' }}>
        <Utilities />
      </Box>
    </Box>
  );
};

// <Header /> <Main />
