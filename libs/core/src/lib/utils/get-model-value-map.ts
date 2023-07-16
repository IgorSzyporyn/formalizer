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

  for (const [_, model] of Object.entries(modelIdMap || {})) {
    const apiType = model.apiType;
    const isDataParent = apiType === 'object' || apiType === 'array';
    const allowDataGather = !isDataParent;
    const gatherEmptyValues = options.partialValues;

    // Convert from whatever is stored
    const value = model.valueToRaw?.({ model, value: model.value, options });

    if (
      allowDataGather &&
      !gatherEmptyValues &&
      value !== undefined &&
      model.path
    ) {
      valueMap[model.path] = value;
    } else if (allowDataGather && gatherEmptyValues && model.path) {
      valueMap[model.path] = value;
    }
  }

  return valueMap;
};
