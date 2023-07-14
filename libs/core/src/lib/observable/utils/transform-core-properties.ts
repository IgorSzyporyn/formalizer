import {
  FormalizerModelIdMap,
  FormalizerOptions,
} from '../../types/formalizer-types';
import {
  CoreModelType,
  FormalizedModel,
  ListenerCallback,
} from '../../types/model-types';
import { getCoreModel } from '../../utils/get-core-model';
import { setValueProperty } from './set-value-property';

type TransformCorePropertiesProps = {
  model: FormalizedModel;
  type: CoreModelType;
  options?: FormalizerOptions;
  modelIdMap: FormalizerModelIdMap;
  onChange: ListenerCallback;
};

export const transformCoreProperties = ({
  model,
  type,
  options,
  onChange,
  modelIdMap,
}: TransformCorePropertiesProps) => {
  const coreModel = getCoreModel(type);

  // Attach updated correct API properties on model
  model.apiType = coreModel?.apiType;
  model.valueToRaw = coreModel?.valueToRaw;
  model.rawToValue = coreModel?.rawToValue;

  // Attach updated correct defaultProperties and preventedProperties
  model.preventedProperties = coreModel?.preventedProperties;
  model.defaultProperties = coreModel?.defaultProperties;

  // Convert defaultValue property if present
  if (model.defaultValue !== undefined) {
    model.defaultValue = model.valueToRaw?.({
      model,
      options,
      value: model.defaultValue,
    });

    onChange({ model, property: 'defaultValue', value: model.defaultValue });
  }

  // Convert defaultValue property if present
  if (model.emptyValue !== undefined) {
    model.emptyValue = model.valueToRaw?.({
      model,
      options,
      value: model.emptyValue,
    });

    onChange({ model, property: 'emptyValue', value: model.emptyValue });
  }

  // Convert the value if present
  setValueProperty({
    model,
    value: model.value,
    modelIdMap,
    onChange,
    options,
  });
};
