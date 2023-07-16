import {
  FormalizedModelFlat,
  FormalizerCoreConfig,
  FormalizerCoreOptions,
} from '../../typings/formalizer-types';
import { FormalizedModel, ListenerProps } from '../../typings/model-types';

export type CreateObjectObserveHandlerProps = {
  config: FormalizerCoreConfig;
  dataParentId?: string;
  index?: number;
  model: FormalizedModel;
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  onModelItemChange: (props: ListenerProps) => void;
  options?: FormalizerCoreOptions;
  parentId?: string;
  path?: string;
};
