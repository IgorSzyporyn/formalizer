import { cloneDeep } from 'lodash';
import { apiModel } from '../models/api-models';
import { ApiModelInterface } from '../types/model-types';

export const getApiModels = () => {
  const models: ApiModelInterface = cloneDeep(apiModel);

  return models;
};
