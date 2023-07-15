import deepmerge from 'deepmerge';
import {
  FormalizedModelFlat,
  FormalizerCoreConfig,
  FormalizerCoreOptions,
} from '../types/formalizer-types';
import { FormalizedModel } from '../types/model-types';
import { getModelValueMap } from './get-model-value-map';
import { isObject } from 'lodash';
import dot from 'dot-object';

type ApplyValuesProps = {
  model?: FormalizedModel;
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  config: FormalizerCoreConfig;
  options: FormalizerCoreOptions;
};

export const applyValues = ({
  model,
  modelIdMap,
  modelPathMap,
  config,
  options,
}: ApplyValuesProps) => {
  if (!model || !modelIdMap) return false;

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
  modelPathMap: FormalizedModelFlat = {}
) => {
  const looper = ({ value, path }: { value: unknown; path?: string }) => {
    switch (typeof value) {
      case 'object':
        if (Array.isArray(value)) {
          if (path) {
            modelPathMap[path].initialValue = value;
            modelPathMap[path].value = value;
          }

          value.forEach((_value, _index) => {
            looper({
              value: _value,
              path: `${path}[${_index}]`,
            });
          });
        } else if (isObject(value)) {
          if (path) {
            modelPathMap[path].initialValue = value;
            modelPathMap[path].value = value;
          }

          for (const [_key, _value] of Object.entries(
            value as Record<string, unknown>
          )) {
            looper({ value: _value, path: path ? `${path}.${_key}` : _key });
          }
        }
        break;
      default:
        if (path) {
          modelPathMap[path].initialValue = value;
          modelPathMap[path].value = value;
        }
        break;
    }
  };

  looper({ value });
};
