import {
  FormalizedModel,
  ListenerCallback,
  CoreModelType,
} from '../../typings/model-types';
import { getCoreModel } from '../../utils/get-core-model';

type RemovePreventedPropertiesProps = {
  model: FormalizedModel;
  onChange: ListenerCallback;
  type: CoreModelType;
};

export const removePreventedProperties = ({
  model,
  onChange,
  type,
}: RemovePreventedPropertiesProps) => {
  const coreModel = getCoreModel(type);
  const preventedProperties = coreModel?.preventedProperties;

  preventedProperties?.forEach((preventedProperty) => {
    if (model[preventedProperty] !== undefined) {
      model[preventedProperty] = undefined;

      onChange({
        model,
        property: preventedProperty,
        value: undefined,
      });
    }
  });
};
