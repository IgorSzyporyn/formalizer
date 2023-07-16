import { ThemeProvider } from '@emotion/react';
import { ClientModel, FormalizerCore } from '@formalizer/core';
import { theme } from '@formalizer/theme';
import { Box, CssBaseline } from '@mui/material';
import deepmerge from 'deepmerge';
import { useCallback, useState } from 'react';
import {
  DesignerContext,
  DesignerUiContext,
  DesignerUiContextValueSafe,
  defaultDesignerUiContextValue,
} from './context';
import { Canvas } from './layout/canvas/canvas';
import { Utilities } from './layout/utilities/utilities';
import './styles/global.css';

export type DesignerProps = {
  model?: ClientModel;
};

export const Designer = ({ model }: DesignerProps) => {
  const formalizer = new FormalizerCore({ model });
  const [uiState, setUiState] = useState<DesignerUiContextValueSafe>({
    ...defaultDesignerUiContextValue,
  });

  const updateUiContext = useCallback(
    (value: Partial<DesignerUiContextValueSafe>) => {
      setUiState(deepmerge(uiState, value));
    },
    [uiState]
  );

  window.A = formalizer;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DesignerContext.Provider value={{ formalizer }}>
        <DesignerUiContext.Provider value={{ ...uiState, updateUiContext }}>
          <Box className="designer" sx={{ display: 'flex', height: '100%' }}>
            <Canvas className="designer-main" sx={{ flexGrow: '1', mr: 4 }} />
            <Utilities className="designer-utilities" sx={{ height: '100%' }} />
          </Box>
        </DesignerUiContext.Provider>
      </DesignerContext.Provider>
    </ThemeProvider>
  );
};
