import { CoreModel, CoreModelType } from '../typings/model-types';
import { getCoreModels } from './get-core-models';

export const getCoreModel = (type?: CoreModelType) => {
  const coreModels = getCoreModels();
  let coreModel: CoreModel | undefined;

  if (type) {
    coreModel = coreModels[type];
  }

  return coreModel;
};
