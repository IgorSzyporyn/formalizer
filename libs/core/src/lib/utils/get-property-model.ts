import { PropertyModel, PropertyModelType } from '../types/model-types';
import { getPropertyModels } from './get-property-models';

export const getPropertyModel = (type?: PropertyModelType) => {
  const propertyModels = getPropertyModels();
  let propertyModel: PropertyModel | undefined;

  if (type) {
    propertyModel = propertyModels[type];
  }

  return propertyModel;
};
