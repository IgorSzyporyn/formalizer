import { cloneDeep } from 'lodash';
import { propertiesModel } from '../models/property-models';
import { PropertyModelInterface } from '../typings/model-types';

export const getPropertyModels = () => {
  const models: PropertyModelInterface = cloneDeep(propertiesModel);

  return models;
};
