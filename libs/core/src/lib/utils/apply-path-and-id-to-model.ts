import { FormalizedModelFlat } from '../types/formalizer-types';
import { FormalizedModel } from '../types/model-types';

type ApplyPathAndIdToModelProp = {
  parent?: FormalizedModel;
  model: FormalizedModel;
  modelIdMap: FormalizedModelFlat;
  path?: string;
  index?: number;
  dataParentModel?: FormalizedModel;
};

export const applyPathAndIdToModel = ({
  model,
  parent,
  path,
  modelIdMap,
  index,
  dataParentModel,
}: ApplyPathAndIdToModelProp) => {
  const parentModel = parent && parent.id ? modelIdMap[parent.id] : undefined;

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
