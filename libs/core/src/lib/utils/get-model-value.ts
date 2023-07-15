import { isEmpty } from 'lodash';
import { ApiValue, FormalizedModel } from '../types/model-types';
import { FormalizerCoreOptions } from '../types/formalizer-types';

type GetModelValueProps = {
  model: FormalizedModel;
  options?: FormalizerCoreOptions;
};

export const getModelValue = ({ model, options }: GetModelValueProps) => {
  let value = model.value;
  const arrayValue: ApiValue | undefined = [];
  const objectValue: ApiValue | undefined = {};
  let arrayActuallyHasValues = false;

  switch (model.apiType) {
    case 'array':
      model.items?.forEach((item) => {
        if (item.value !== undefined) {
          arrayActuallyHasValues = true;
        }

        const itemValue = getModelValue({ model: item });

        arrayValue.push(itemValue as never);
      });

      if (
        (arrayValue.length === 0 && model.value === undefined) ||
        !arrayActuallyHasValues
      ) {
        value = undefined;
      } else {
        value = arrayValue;
      }

      break;
    case 'object':
      model.items?.forEach((item) => {
        const itemValue = getModelValue({ model: item });

        if (itemValue !== undefined) {
          objectValue[item.name] = itemValue;
        }
      });

      if (isEmpty(objectValue) && model.value === undefined) {
        value = undefined;
      } else {
        value = objectValue;
      }
      break;
    default:
      if (model.valueToRaw) {
        value = model.valueToRaw({ model, value: model.value, options });
      }
      break;
  }

  return value;
};
