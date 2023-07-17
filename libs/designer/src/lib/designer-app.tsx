import { Box } from '@mui/material';
import { Canvas } from './layout/canvas/canvas';
import { Utilities } from './layout/utilities/utilities';

export const DesignerApp = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ flexGrow: '1', height: '100%', mr: 2, ml: 2, mt: 4 }}>
        <Canvas sx={{ height: '100%', ml: 2, mr: 2 }} />
      </Box>
      <Box sx={{ height: '100%' }}>
        <Utilities />
      </Box>
    </Box>
  );
};

// <Header />
