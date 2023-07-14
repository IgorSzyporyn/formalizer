import {
  ClientModel,
  CoreModelInterface,
  ExtensionInterface,
  FormalizedModel,
  ListenerProps,
} from './model-types';

export type FormalizerOptions = {
  initialValue?: Record<string, unknown>;
  emptyValues?: boolean;
  onModelChange?: (change: FormalizerModelChange) => void;
};

export type FormalizerModelChange = {
  model?: FormalizedModel;
  state?: FormalizerState;
  modelIdMap?: FormalizerModelIdMap;
  modelPathMap?: FormalizerModelPathMap;
  modelStateMap?: FormalizerModelStateMap;
  props?: ListenerProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: Record<string, any>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormalizerValueChange = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: Record<string, any>;
  model: FormalizedModel;
};

export type FormalizerCustomConfig = {
  core?: CoreModelInterface;
  extension?: ExtensionInterface;
};

export type FormalizerConfig = {
  options?: FormalizerOptions;
  model?: ClientModel;
  extension?: ExtensionInterface;
  custom?: FormalizerCustomConfig;
};

export type FormalizerState = {
  dirty: boolean;
  touched: boolean;
  valid: boolean;
  errors: Record<string, string | string[]>;
  touchedMap: Record<string, boolean>;
  dirtyMap: Record<string, boolean>;
};

export type FormalizerModelIdMap = Record<string, FormalizedModel>;
export type FormalizerModelPathMap = Record<string, FormalizedModel>;

export type FormalizerModelState = {
  dirty: boolean;
  touched: boolean;
  valid: boolean;
  initialValue?: unknown;
  error?: string | string[];
};

export type FormalizerModelStateMap = Record<string, FormalizerModelState>;
