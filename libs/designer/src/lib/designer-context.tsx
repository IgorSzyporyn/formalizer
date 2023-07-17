import { FormalizerCore } from '@formalizer/core';
import { createContext } from 'react';
import { CanvasMode, CanvasTab, UtilityTab } from './typings/designer-types';

export type DesignerContextValue = {
  formalizer: FormalizerCore | undefined;
};

export const DesignerContext = createContext<DesignerContextValue>({
  formalizer: undefined,
});

export type DesignerUiContextValueSafe = {
  activeUtilityTab: UtilityTab;
  activeCanvasTab: CanvasTab;
  utilitiesCollapsed: boolean;
  canvasCollapsed: boolean;
  activeModelId?: string;
  canvasMode?: CanvasMode;
};

export const defaultDesignerUiContextValue: DesignerUiContextValue = {
  activeModelId: undefined,
  activeUtilityTab: UtilityTab.Layer,
  activeCanvasTab: CanvasTab.Illustration,
  utilitiesCollapsed: false,
  canvasCollapsed: false,
  canvasMode: CanvasMode.Illustration,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUiContext: () => {},
};

export type DesignerUiContextValue = {
  updateUiContext: (value: Partial<DesignerUiContextValueSafe>) => void;
} & DesignerUiContextValueSafe;

export const DesignerUiContext = createContext<DesignerUiContextValue>({
  ...defaultDesignerUiContextValue,
});
