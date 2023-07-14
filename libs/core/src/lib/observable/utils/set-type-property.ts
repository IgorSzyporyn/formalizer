import {
  FormalizerModelIdMap,
  FormalizerOptions,
} from '../../types/formalizer-types';
import {
  CoreModelType,
  FormalizedModel,
  ListenerCallback,
} from '../../types/model-types';
import { isCoreType } from '../../utils/is-core-type';
import { addDefaultProperties } from './add-default-properties';
import { removePreventedProperties } from './remove-prevented-properties';
import { transformCoreProperties } from './transform-core-properties';

type SetTypeProperty = {
  model: FormalizedModel;
  type: CoreModelType;
  onChange: ListenerCallback;
  modelIdMap: FormalizerModelIdMap;
  options?: FormalizerOptions;
};

export const setTypeProperty = ({
  model,
  type,
  onChange,
  options,
  modelIdMap,
}: SetTypeProperty) => {
  const allowedType = isCoreType(type);

  // Set value for type if allowed, if not - then complain in console.warn
  if (allowedType) {
    model.type = type;

    removePreventedProperties({ model, onChange, type });
    addDefaultProperties({ model, onChange, type });
    transformCoreProperties({ model, type, options, onChange, modelIdMap });

    onChange({ model, property: 'type', value: type });
  } else {
    console.warn(
      `The invalid type: "${type}" was attemped set on the model: "${model.id}"`
    );
  }
};
