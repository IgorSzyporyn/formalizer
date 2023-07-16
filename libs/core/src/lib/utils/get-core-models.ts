import deepmerge from 'deepmerge';
import { coreModel } from '../models/core-models';
import { CoreModelInterface, CoreModelType } from '../typings/model-types';
import { getApiModels } from './get-api-models';

export const getCoreModels = (customCoreModels?: CoreModelInterface) => {
  const apiModels = getApiModels();
  const coreModels = { ...(customCoreModels || coreModel) };

  // Fetch the corresponding ApiModel via apiType for each model
  for (const [key, value] of Object.entries(coreModels)) {
    const type = key as CoreModelType;

    coreModels[type] = deepmerge(apiModels[value.apiType || 'string'], value);
  }

  return coreModels;
};
