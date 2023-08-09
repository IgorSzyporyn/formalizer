import { FormalizedModel } from '../../typings/model-types';

export const updateDependencies = (
  modelIdMap: Record<string, FormalizedModel> | undefined,
  oldItemId: string | undefined,
  newId: string | undefined
): void => {
  Object.values(modelIdMap ?? {}).forEach((mappedModel) => {
    mappedModel.dependencies?.forEach((dependency) => {
      if (dependency.id === oldItemId && newId) {
        dependency.id = newId;
      }
    });
  });
};
