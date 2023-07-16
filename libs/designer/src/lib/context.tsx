import { FormalizerCore } from '@formalizer/core';
import { createContext } from 'react';
import { UtilityTab } from './typings/designer-types';

export type DesignerContextValue = {
  formalizer: FormalizerCore | undefined;
};

export const DesignerContext = createContext<DesignerContextValue>({
  formalizer: undefined,
});

export type DesignerUiContextValueSafe = {
  activeTab: UtilityTab;
  utilitiesCollapsed: boolean;
  activeModelId?: string;
};

export const defaultDesignerUiContextValue: DesignerUiContextValue = {
  activeModelId: undefined,
  activeTab: UtilityTab.Layer,
  utilitiesCollapsed: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUiContext: () => {},
};

export type DesignerUiContextValue = {
  updateUiContext: (value: Partial<DesignerUiContextValueSafe>) => void;
} & DesignerUiContextValueSafe;

export const DesignerUiContext = createContext<DesignerUiContextValue>({
  ...defaultDesignerUiContextValue,
});
