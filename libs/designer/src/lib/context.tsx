import { FormalizerCore } from '@formalizer/core';
import { createContext } from 'react';

export type DesignerContextValue = {
  formalizer: FormalizerCore | undefined;
};

export const DesignerContext = createContext<DesignerContextValue>({
  formalizer: undefined,
});

export enum UtilityTab {
  Layer = 1,
  Toolbox = 2,
  Properties = 3,
}

export type DesignerUiContextValueSafe = {
  utilities: { activeTab: UtilityTab; collapsed: boolean };
  activeModelId?: string;
};

export const defaultDesignerUiContextValue: DesignerUiContextValue = {
  utilities: { activeTab: UtilityTab.Layer, collapsed: false },
  activeModelId: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUiContext: () => {},
};

export type DesignerUiContextValue = {
  updateUiContext: (value: Partial<DesignerUiContextValueSafe>) => void;
} & DesignerUiContextValueSafe;

export const DesignerUiContext = createContext<DesignerUiContextValue>({
  ...defaultDesignerUiContextValue,
});
