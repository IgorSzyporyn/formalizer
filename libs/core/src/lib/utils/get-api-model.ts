import { ApiModel, ApiModelType } from '../types/model-types';
import { getApiModels } from './get-api-models';

export const getApiModel = (type?: ApiModelType) => {
  const apiModels = getApiModels();
  let apiModel: ApiModel | undefined;

  if (type) {
    apiModel = apiModels[type];
  }

  return apiModel;
};
