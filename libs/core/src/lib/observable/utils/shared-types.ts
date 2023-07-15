import {
  FormalizedModelFlat,
  FormalizerCoreOptions,
} from '../../types/formalizer-types';
import {
  CoreModelInterface,
  ExtensionInterface,
  FormalizedModel,
  ListenerProps,
} from '../../types/model-types';

export type CreateObjectObserveHandlerProps = {
  customCoreModel?: CoreModelInterface;
  dataParentModel?: FormalizedModel;
  extension?: ExtensionInterface;
  index?: number;
  model: FormalizedModel;
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  options?: FormalizerCoreOptions;
  parent?: FormalizedModel;
  onModelItemChange: (props: ListenerProps) => void;
  path?: string;
};
