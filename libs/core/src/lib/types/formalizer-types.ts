import {
  ClientModel,
  CoreModelInterface,
  ExtensionInterface,
  FormalizedModel,
  ListenerProps,
} from './model-types';

export type FormalizerModelChange = {
  model?: FormalizedModel;
  state?: FormalizerCoreState;
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  props?: ListenerProps;
  value?: Record<string, unknown>;
};

export type FormalizerCoreConfig = {
  model?: ClientModel;
  initialValue?: Record<string, unknown>;
  extension?: ExtensionInterface;
  core?: CoreModelInterface;
  onModelChange?: (change: FormalizerModelChange) => void;
};

export type FormalizerCoreOptions = {
  partialValues?: boolean;
};

export type FormalizerCoreParams = FormalizerCoreConfig & FormalizerCoreOptions;

export type FormalizerCoreState = {
  dirty: boolean;
  touched: boolean;
  valid: boolean;
  errors: Record<string, string | string[]>;
};

export type FormalizedModelFlat = Record<string, FormalizedModel>;
