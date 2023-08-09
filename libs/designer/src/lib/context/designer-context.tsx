import { FormalizerCore } from '@formalizer/core';
import { createContext } from 'react';
import { CanvasMode, CanvasTab, UtilityTab } from '../typings/designer-types';

export const FormalizerContext = createContext<FormalizerCore | undefined>(undefined);

export type UiContextValueSafe = {
  // Canvas layout values
  canvasCollapsed: boolean;
  canvasMode?: CanvasMode;
  activeCanvasTab: CanvasTab;
  // Utilities layout values
  utilitiesCollapsed: boolean;
  utilitiesWidth: number;
  utilitiesMinWidth: number;
  activeUtilityTab?: UtilityTab;
  // Active model IDs
  activeEditModelId?: string;
  activeFocusModelId?: string;
  activeDataModelId?: string;
};

export const defaultUiContext: UiContextValue = {
  activeEditModelId: undefined,
  activeFocusModelId: undefined,
  activeDataModelId: undefined,
  activeUtilityTab: UtilityTab.Layer,
  utilitiesWidth: 500,
  utilitiesMinWidth: 300,
  activeCanvasTab: CanvasTab.Illustration,
  utilitiesCollapsed: false,
  canvasCollapsed: true,
  canvasMode: CanvasMode.Illustration,
  updateUi: () => {
    return;
  },
};

export type UiContextValue = {
  updateUi: (value: Partial<UiContextValueSafe>) => void;
} & UiContextValueSafe;

export const UiContext = createContext<UiContextValue>({
  ...defaultUiContext,
});
