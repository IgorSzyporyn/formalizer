import { propertiesModel } from '../models/property-models';
import { PropertyModelInterface } from '../typings/model-types';

export const getPropertyModels = () => {
  const models: PropertyModelInterface = { ...propertiesModel };

  return models;
};
