import { PropertyModel, ClientPropertyType } from '../types/model-types';
import { getPropertyModels } from './get-property-models';

export const getPropertyModel = (type?: ClientPropertyType) => {
  const propertyModels = getPropertyModels();
  let propertyModel: PropertyModel | undefined;

  if (type) {
    propertyModel = propertyModels[type];
  }

  return propertyModel;
};
