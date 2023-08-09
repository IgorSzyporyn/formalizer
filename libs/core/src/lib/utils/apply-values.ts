import deepmerge from 'deepmerge';
import dot from 'dot-object';
import {
  FormalizedModelFlat,
  FormalizerCoreConfig,
  FormalizerCoreOptions,
} from '../typings/formalizer-types';
import { getModelValueMap } from './get-model-value-map';

type ApplyValuesProps = {
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  config?: FormalizerCoreConfig;
  options?: FormalizerCoreOptions;
};

export const applyValues = ({
  modelIdMap,
  modelPathMap,
  config = {},
  options = {},
}: ApplyValuesProps) => {
  if (!modelIdMap || !modelPathMap) return false;

  const { initialValue } = config;
  const valueMap = getModelValueMap({ modelIdMap, options });
  const defaultValue = dot.object(valueMap) as Record<string, unknown>;

  const values = initialValue ? deepmerge(defaultValue, initialValue) : defaultValue;

  applyValueToModel(values, modelPathMap);

  return true;
};

const applyValueToModel = (
  value: Record<string, unknown>,
  modelPathMap: FormalizedModelFlat
) => {
  looper({ value, modelPathMap });
};

const applyValueToPath = (
  value: unknown,
  path: string | undefined,
  modelPathMap: FormalizedModelFlat
) => {
  if (path && modelPathMap[path]) {
    if (modelPathMap[path].initialValue === undefined) {
      modelPathMap[path].initialValue = value;
    }

    modelPathMap[path].value = value;
  }
};

const looper = ({
  value,
  path,
  modelPathMap,
}: {
  modelPathMap: FormalizedModelFlat;
  value: unknown;
  path?: string;
}) => {
  if (Array.isArray(value)) {
    applyValueToPath(value, path, modelPathMap);

    value.forEach((_value, _index) => {
      looper({
        value: _value,
        path: `${path}[${_index}]`,
        modelPathMap,
      });
    });
  } else if (typeof value === 'object' && value !== null) {
    applyValueToPath(value, path, modelPathMap);

    for (const _key in value as Record<string, unknown>) {
      // eslint-disable-next-line no-prototype-builtins
      if ((value as Record<string, unknown>).hasOwnProperty(_key)) {
        const _value = (value as Record<string, unknown>)[_key];

        looper({
          value: _value,
          path: path ? `${path}.${_key}` : _key,
          modelPathMap,
        });
      }
    }
  } else {
    applyValueToPath(value, path, modelPathMap);
  }
};
