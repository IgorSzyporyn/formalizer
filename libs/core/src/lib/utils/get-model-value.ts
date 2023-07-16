import { isEmpty } from 'lodash';
import { FormalizerCoreOptions } from '../typings/formalizer-types';
import { FormalizedModel } from '../typings/model-types';

type GetModelValueProps = {
  model: FormalizedModel;
  options?: FormalizerCoreOptions;
};

export const getModelValue = ({ model, options }: GetModelValueProps) => {
  let value = model.value;
  const arrayValue: Array<unknown> | undefined = [];
  const objectValue: Record<string, unknown> | undefined = {};
  let arrayActuallyHasValues = false;

  switch (model.apiType) {
    case 'array':
      model.items?.forEach((item) => {
        if (item.value !== undefined) {
          arrayActuallyHasValues = true;
        }

        const itemValue = getModelValue({ model: item });

        arrayValue.push(itemValue);
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
