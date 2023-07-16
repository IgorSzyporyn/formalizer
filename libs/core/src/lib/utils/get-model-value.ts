import { FormalizerCoreOptions } from '../typings/formalizer-types';
import { FormalizedModel } from '../typings/model-types';

type GetModelValueProps = {
  model: FormalizedModel;
  options?: FormalizerCoreOptions;
};

// Helper function to check if an array or object is empty
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCollectionEmpty = (collection: any) =>
  collection instanceof Array
    ? collection.length === 0
    : Object.keys(collection).length === 0;

export const getModelValue = ({ model, options }: GetModelValueProps) => {
  let value = model.value;

  switch (model.apiType) {
    case 'array':
    case 'object':
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-explicit-any
      const collection: any = model.apiType === 'array' ? [] : {};

      model.items?.forEach((item) => {
        const itemValue = getModelValue({ model: item });

        if (itemValue !== undefined) {
          if (model.apiType === 'array') {
            collection.push(itemValue);
          } else {
            collection[item.name] = itemValue;
          }
        }
      });

      value =
        isCollectionEmpty(collection) && model.value === undefined
          ? undefined
          : collection;
      break;
    default:
      if (model.valueToRaw) {
        value = model.valueToRaw({ model, value: model.value, options });
      }
      break;
  }

  return value;
};
