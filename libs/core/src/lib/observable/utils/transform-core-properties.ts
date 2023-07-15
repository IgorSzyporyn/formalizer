import { CoreModelType, ListenerCallback } from '../../types/model-types';
import { getCoreModel } from '../../utils/get-core-model';
import { setValueProperty } from './set-value-property';
import { CreateObjectObserveHandlerProps } from './shared-types';

type TransformCorePropertiesProps = {
  type: CoreModelType;
  onChange: ListenerCallback;
} & CreateObjectObserveHandlerProps;

export const transformCoreProperties = ({
  model,
  type,
  onChange,
  options,
  ...rest
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
    ...rest,
    options,
    model,
    value: model.value,
    onChange,
  });
};
