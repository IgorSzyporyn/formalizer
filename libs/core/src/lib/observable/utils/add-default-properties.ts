import { isEqual } from 'lodash';
import {
  FormalizedModel,
  ListenerCallback,
  CoreModelType,
} from '../../types/model-types';
import { getCoreModel } from '../../utils/get-core-model';
import { getPropertyModel } from '../../utils/get-property-model';

type AddDefaultPropertiesProps = {
  model: FormalizedModel;
  onChange: ListenerCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: CoreModelType;
};

export const addDefaultProperties = ({
  model,
  onChange,
  type,
}: AddDefaultPropertiesProps) => {
  const coreModel = getCoreModel(type);
  const defaultProperties = coreModel?.defaultProperties;

  defaultProperties?.forEach((property) => {
    const propertyModel = getPropertyModel(property);
    const oldPropertyValue = model[property];
    const defaultPropertyValue = propertyModel?.defaultValue as never;

    if (
      oldPropertyValue === undefined &&
      !isEqual(oldPropertyValue, defaultPropertyValue)
    ) {
      model[property] = defaultPropertyValue;

      onChange({
        model,
        property,
        value: defaultPropertyValue,
      });
    }
  });
};