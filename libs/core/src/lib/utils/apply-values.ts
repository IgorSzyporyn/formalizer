import deepmerge from 'deepmerge';
import dot from 'dot-object';
import { isObject } from 'lodash';
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

  if (initialValue) {
    const values = deepmerge(defaultValue, initialValue);

    applyValueToModel(values, modelPathMap);
  } else {
    applyValueToModel(defaultValue, modelPathMap);
  }

  return true;
};

const applyValueToModel = (
  value: Record<string, unknown>,
  modelPathMap: FormalizedModelFlat
) => {
  //

  looper({ value, modelPathMap });
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
  switch (typeof value) {
    case 'object':
      if (Array.isArray(value)) {
        if (path && modelPathMap[path]) {
          if (modelPathMap[path].initialValue === undefined) {
            modelPathMap[path].initialValue = value;
          }

          modelPathMap[path].value = value;
        }

        value.forEach((_value, _index) => {
          looper({
            value: _value,
            path: `${path}[${_index}]`,
            modelPathMap,
          });
        });
      } else if (isObject(value)) {
        if (path && modelPathMap[path]) {
          if (modelPathMap[path].initialValue === undefined) {
            modelPathMap[path].initialValue = value;
          }

          modelPathMap[path].value = value;
        }

        for (const [_key, _value] of Object.entries(
          value as Record<string, unknown>
        )) {
          looper({
            value: _value,
            path: path ? `${path}.${_key}` : _key,
            modelPathMap,
          });
        }
      }
      break;
    default:
      if (path && modelPathMap[path]) {
        if (modelPathMap[path].initialValue === undefined) {
          modelPathMap[path].initialValue = value;
        }

        modelPathMap[path].value = value;
      }
      break;
  }
};
