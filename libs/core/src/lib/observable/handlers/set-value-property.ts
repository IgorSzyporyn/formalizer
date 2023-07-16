import { isEqual } from 'lodash';
import { ApiModelType, ListenerCallback } from '../../typings/model-types';
import { propagateValueProperty } from '../utils/propagate-value-property';
import { CreateObjectObserveHandlerProps } from '../typings/shared-types';

const checkValueDirty = ({
  apiType,
  newValue,
  oldValue,
}: {
  apiType?: ApiModelType;
  newValue?: unknown;
  oldValue?: unknown;
}) => {
  let dirty = false;

  switch (apiType) {
    case 'array':
    case 'object':
      dirty = !isEqual(newValue, oldValue);
      break;
    default:
      dirty = newValue !== oldValue;
      break;
  }

  return dirty;
};

type SetValuePropertyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  onChange: ListenerCallback;
} & CreateObjectObserveHandlerProps;

export const setValueProperty = ({
  model,
  value,
  modelIdMap,
  onChange,
  options,
  ...rest
}: SetValuePropertyProps) => {
  const newValue = model.valueToRaw?.({ value, model, options });
  const dirty = checkValueDirty({
    apiType: model.apiType,
    newValue,
    oldValue: value,
  });

  if (!dirty) {
    model.value = newValue;
    model.touched = true;
    model.dirty = checkValueDirty({
      apiType: model.apiType,
      newValue,
      oldValue: model.initialValue,
    });

    onChange({ model, property: 'value', value: newValue });

    switch (model.apiType) {
      case 'array':
        model.items?.forEach((item, index) => {
          const _value = (value || []) as [];
          if (item.id && modelIdMap) {
            modelIdMap[item.id].value = _value[index];
          }
        });
        break;
      case 'object':
        model.items?.forEach((item) => {
          if (modelIdMap && item.id) {
            const _value = (value || {}) as Record<string, unknown>;
            modelIdMap[item.id].value = _value[item.name];
          }
        });
        break;
      default:
        break;
    }

    // Propagate the value change up to the dataParent
    if (model.apiType !== 'none' && model.dataParentId) {
      propagateValueProperty({
        ...rest,
        model,
        options,
        modelIdMap,
        value,
        parentId: model.dataParentId,
      });
    }
  }
};
