import {
  FormalizedModelFlat,
  FormalizerCoreOptions,
} from '../typings/formalizer-types';

type GetModelValueMapProps = {
  modelIdMap: FormalizedModelFlat;
  options: FormalizerCoreOptions;
};

export const getModelValueMap = ({
  modelIdMap,
  options,
}: GetModelValueMapProps) => {
  const valueMap: Record<string, unknown | undefined> = {};

  for (const modelId in modelIdMap) {
    // eslint-disable-next-line no-prototype-builtins
    if (modelIdMap.hasOwnProperty(modelId)) {
      const model = modelIdMap[modelId];
      const apiType = model.apiType;
      const isDataParent = apiType === 'object' || apiType === 'array';

      if (!isDataParent && model.path) {
        // Convert from whatever is stored
        const value = model.valueToRaw?.({
          model,
          value: model.value,
          options,
        });
        const gatherEmptyValues = options.partialValues;

        if (gatherEmptyValues || value !== undefined) {
          valueMap[model.path] = value;
        }
      }
    }
  }

  return valueMap;
};
