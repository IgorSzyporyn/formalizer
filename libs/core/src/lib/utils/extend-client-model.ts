import deepmerge from 'deepmerge';
import {
  ClientModel,
  CoreModelInterface,
  FormalizedModel,
} from '../typings/model-types';
import { getApiModel } from './get-api-model';
import { getCoreModel } from './get-core-model';

export const extendClientModel = (
  clientModel: ClientModel,
  customCoreModel?: CoreModelInterface
) => {
  const clientType = clientModel.type;
  const clientApiType = clientModel.apiType;

  const coreModel = customCoreModel?.[clientType] || getCoreModel(clientType);
  const coreApiType = coreModel?.apiType;

  let extendedModel: FormalizedModel = clientModel;

  if (coreModel) {
    extendedModel = deepmerge(coreModel, clientModel);

    if (clientApiType !== coreApiType) {
      const apiModel = getApiModel(clientApiType) as FormalizedModel;
      extendedModel = deepmerge(extendedModel, apiModel || {});
    }
  }

  return extendedModel;
};
