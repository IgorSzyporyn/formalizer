import { isEqual } from 'lodash';
import { FormalizedModelFlat } from '../typings/formalizer-types';
import { Dependency, FormalizedModel } from '../typings/model-types';

export const createDependencyListenerId = (
  model: FormalizedModel,
  dependency: Dependency
) => `dependency-listener-${model.id}-${dependency.matchProp}`;

type ApplyDependenciesProps = {
  model?: FormalizedModel;
  modelIdMap?: FormalizedModelFlat;
};

export const applyDependencies = ({
  model,
  modelIdMap,
}: ApplyDependenciesProps): boolean => {
  if (!model || !modelIdMap) return false;

  // Iterate over the model's dependencies
  model.dependencies?.forEach((dependency) => {
    createDependencyListener({
      model,
      dependency,
      modelIdMap,
    });
  });

  // Iterate over the model's items
  model.items?.forEach((item) => applyDependencies({ model: item, modelIdMap }));

  return true;
};

type CreateDependencyListenerProps = {
  model: FormalizedModel;
  modelIdMap: FormalizedModelFlat;
  dependency: Dependency;
};

const createDependencyListener = ({
  model,
  dependency,
  modelIdMap,
}: CreateDependencyListenerProps): void => {
  const invoker = modelIdMap[dependency.id];

  invoker.addListener?.({
    id: createDependencyListenerId(model, dependency),
    property: dependency.matchProp,
    callback: ({ value }) => {
      if (model.id) {
        invokeDependency({ model: modelIdMap[model.id], value, dependency });
      }
    },
  });
};

type InvokeDependenciesProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  model: FormalizedModel;
  dependency: Dependency;
};

const invokeDependency = ({
  value,
  model,
  dependency,
}: InvokeDependenciesProps): void => {
  let success = false;

  if (dependency.matchValue !== undefined) {
    success = isEqual(dependency.matchValue, value);
  } else if (dependency.matchAnyOf && value?.includes) {
    success = dependency.matchAnyOf.some((item) => value.includes(item));
  } else if (dependency.matchAllOf && value?.includes) {
    success = dependency.matchAllOf.every((item) => value.includes(item));
  } else if (dependency.matchNoneOf) {
    success = value?.includes
      ? dependency.matchNoneOf.every((item) => !value.includes(item))
      : true;
  }

  const newValue = success ? dependency.successValue : dependency.failureValue;
  const targetProp = dependency.targetProp;

  model[targetProp] = newValue;
};
