import { FormalizedModelFlat } from '../typings/formalizer-types';
import { FormalizedModel } from '../typings/model-types';

type ApplyPathAndIdToModelProp = {
  dataParentId?: string;
  index?: number;
  model: FormalizedModel;
  modelIdMap?: FormalizedModelFlat;
  parentId?: string;
  path?: string;
};

export const applyPathAndIdToModel = ({
  dataParentId,
  index,
  model,
  modelIdMap,
  parentId,
  path,
}: ApplyPathAndIdToModelProp) => {
  const parentModel = modelIdMap?.[parentId || ''];
  const dataParentModel = modelIdMap?.[dataParentId || ''];

  // Setup ID with default value
  model.id = model.name;

  // Add dot notated ID if parented
  if (parentModel) {
    model.id = `${parentModel.id}.${model.id}`;
  }

  // Handle the model path value and the path value we return
  if (dataParentModel && model.apiType !== 'none') {
    // Has a data parent
    switch (dataParentModel.apiType) {
      case 'array':
        model.path = `${path}[${index}]`;
        path = model.path;
        break;
      case 'object':
        model.path = `${path}.${model.name}`;
        path = model.path;
        break;
      default:
        break;
    }
  } else if (model.apiType !== 'none') {
    switch (model.apiType) {
      case 'array':
        model.path = model.name;
        path = model.path;
        break;
      case 'object':
        model.path = model.name;
        path = model.path;
        break;
      default:
        model.path = model.name;
        break;
    }
  }

  return path;
};
