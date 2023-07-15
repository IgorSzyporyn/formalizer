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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: Record<string, any>;
};

export type FormalizerCoreConfig = {
  model?: ClientModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue?: any;
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
