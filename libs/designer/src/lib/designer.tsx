import { ThemeProvider } from '@emotion/react';
import { ClientModel, FormalizerCore } from '@formalizer/core';
import { theme } from '@formalizer/theme';
import { CssBaseline } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { DesignerApp } from './designer-app';
import {
  DesignerContext,
  DesignerUiContext,
  DesignerUiContextValueSafe,
  defaultDesignerUiContextValue,
} from './designer-context';
import './styles/global.css';

export type DesignerProps = {
  model?: ClientModel;
};

export const Designer = ({ model }: DesignerProps) => {
  const formalizer = useRef(new FormalizerCore({ model }));

  const [uiState, setUiState] = useState<DesignerUiContextValueSafe>(
    defaultDesignerUiContextValue
  );

  const updateUiContext = useCallback(
    (value: Partial<DesignerUiContextValueSafe>) => {
      setUiState({ ...uiState, ...value });
    },
    [uiState]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DesignerContext.Provider value={{ formalizer: formalizer.current }}>
        <DesignerUiContext.Provider value={{ ...uiState, updateUiContext }}>
          <DesignerApp />
        </DesignerUiContext.Provider>
      </DesignerContext.Provider>
    </ThemeProvider>
  );
};
