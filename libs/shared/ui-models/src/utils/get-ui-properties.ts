import { cloneDeep } from 'lodash';
import { uiProperties as _uiProperties } from '../models/property';
import { getPropertyModels } from '@formalizer/core';
import deepmerge from 'deepmerge';

export const getUiProperties = () => {
  const uiPropertiesModel = cloneDeep(_uiProperties);
  const propertiesModel = getPropertyModels();

  const createdUiProperties = deepmerge(propertiesModel, uiPropertiesModel);

  return createdUiProperties;
};
