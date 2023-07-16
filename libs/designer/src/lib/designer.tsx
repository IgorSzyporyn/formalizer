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
  UtilityTab,
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
    utilities: { activeTab: UtilityTab.Layer, collapsed: true },
    activeModelId: formalizer?.getModel()?.id,
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
            <Box className="designer-main" sx={{ flexGrow: '1' }}>
              <Canvas />
            </Box>
            <Box>
              <Utilities />
            </Box>
          </Box>
        </DesignerUiContext.Provider>
      </DesignerContext.Provider>
    </ThemeProvider>
  );
};
