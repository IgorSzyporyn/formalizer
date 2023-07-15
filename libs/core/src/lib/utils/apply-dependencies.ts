import { isEqual } from 'lodash';
import { FormalizedModelFlat } from '../types/formalizer-types';
import { Dependency, FormalizedModel } from '../types/model-types';

type ApplyDependenciesProps = {
  model?: FormalizedModel;
  modelIdMap?: FormalizedModelFlat;
};

export const applyDependencies = ({
  model,
  modelIdMap,
}: ApplyDependenciesProps) => {
  if (!model || !modelIdMap) return false;

  const dependencies = model.dependencies || [];

  dependencies.forEach((dependency) => {
    createDependencyListener({
      model,
      dependency,
      modelIdMap,
    });
  });

  if (model?.items && model?.items.length > 0) {
    applyDependenciesItems(model.items, modelIdMap);
  }

  return true;
};

const applyDependenciesItems = (
  models: FormalizedModel[],
  modelIdMap: FormalizedModelFlat
) => {
  models.forEach((model) => applyDependencies({ model, modelIdMap }));
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
}: CreateDependencyListenerProps) => {
  const invoker = modelIdMap[dependency.id];

  invoker.addListener?.({
    id: `dependency-listener-${model.id}-${dependency.matchProp}`,
    property: dependency.matchProp,
    callback: ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      invokeDependency({ model: modelIdMap[model.id!], value, dependency });
    },
  });
};

type InvokeDependenciesProps = {
  value: unknown;
  model: FormalizedModel;
  dependency: Dependency;
};

const invokeDependency = ({
  value: _value,
  model,
  dependency,
}: InvokeDependenciesProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = _value as any;
  let success = false;

  if (dependency.matchValue !== undefined) {
    success = isEqual(dependency.matchValue, value);
  } else if (dependency.matchAnyOf && value && value.includes) {
    success = dependency.matchAnyOf.some((item) => value.includes(item));
  } else if (dependency.matchAllOf && value && value.includes) {
    let count = 0;

    dependency.matchAllOf.forEach((item) => {
      count = value.includes(item) ? count + 1 : count;
    });

    success = count === dependency.matchAllOf.length;
  } else if (dependency.matchNoneOf) {
    success =
      value && value.includes
        ? dependency.matchNoneOf.every((item) => !value.includes(item))
        : true;
  }

  const newValue = success ? dependency.successValue : dependency.failureValue;
  const targetProp = dependency.targetProp;

  model[targetProp] = newValue as never;
};
