import { PropertyModel, ClientPropertyType } from '../typings/model-types';
import { getPropertyModels } from './get-property-models';

export const getPropertyModel = (type?: ClientPropertyType) => {
  const propertyModels = getPropertyModels();
  let propertyModel: PropertyModel | undefined;

  if (type) {
    propertyModel = propertyModels[type];
  }

  return propertyModel;
};
