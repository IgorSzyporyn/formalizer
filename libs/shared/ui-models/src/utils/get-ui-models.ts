import { CoreModel, CoreModelType, getCoreModels } from '@formalizer/core';
import deepmerge from 'deepmerge';
import { cloneDeep } from 'lodash';
import { uiModels as _uiModels } from '../models/model';
import { UiModel } from '../typings/ui-models-types';

export type CreatedUiModel = Record<CoreModelType, UiModel & CoreModel>;

export const getUiModels = () => {
  const coreModel = getCoreModels();
  const uiModel = cloneDeep(_uiModels);

  const uiModels = deepmerge(coreModel, uiModel);

  return uiModels as CreatedUiModel;
};
