import { apiModel } from '../models/api-models';
import { ApiModelInterface } from '../typings/model-types';

export const getApiModels = () => {
  const models: ApiModelInterface = { ...apiModel };

  return models;
};
