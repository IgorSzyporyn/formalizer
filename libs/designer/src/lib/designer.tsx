import { ThemeProvider } from '@emotion/react';
import { ClientModel, FormalizerCore } from '@formalizer/core';
import { theme } from '@formalizer/theme';
import { CssBaseline } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { DesignerApp } from './designer-app';
import {
  FormalizerContext,
  UiContext,
  UiContextValueSafe,
  defaultUiContext,
} from './context/designer-context';
import './styles/global.css';

export type DesignerProps = {
  model?: ClientModel;
};

export const Designer = ({ model }: DesignerProps) => {
  const formalizer = useRef(new FormalizerCore({ model }));

  const [uiState, setUiState] = useState<UiContextValueSafe>(defaultUiContext);

  const updateUiContext = useCallback(
    (value: Partial<UiContextValueSafe>) => {
      setUiState({ ...uiState, ...value });
    },
    [uiState]
  );

  window.A = formalizer.current;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormalizerContext.Provider value={formalizer.current}>
        <UiContext.Provider value={{ ...uiState, updateUi: updateUiContext }}>
          <DesignerApp />
        </UiContext.Provider>
      </FormalizerContext.Provider>
    </ThemeProvider>
  );
};
