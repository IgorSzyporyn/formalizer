import { isEqual } from 'lodash';
import {
  ApiModelType,
  FormalizedModel,
  ListenerCallback,
} from '../../typings/model-types';
import { propagateValueProperty } from '../utils/propagate-value-property';
import { CreateObjectObserveHandlerProps } from '../typings/shared-types';
import { FormalizedModelFlat } from '../../typings/formalizer-types';

type CheckValueDirtyProps = {
  apiType?: ApiModelType;
  newValue?: unknown;
  oldValue?: unknown;
};

const checkValueDirty = ({
  apiType,
  newValue,
  oldValue,
}: CheckValueDirtyProps) => {
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
  value: unknown;
  onChange: ListenerCallback;
} & CreateObjectObserveHandlerProps;

type SetItemsPropertyProps = {
  model: FormalizedModel;
  value: unknown;
  modelIdMap: FormalizedModelFlat;
};

const setArrayItemsProperty = ({
  model,
  value,
  modelIdMap,
}: SetItemsPropertyProps) => {
  model.items?.forEach((item, index) => {
    const _value = (value || []) as [];
    if (item.id && modelIdMap) {
      modelIdMap[item.id].value = _value[index];
    }
  });
};

const setObjectItemsProperty = ({
  model,
  value,
  modelIdMap,
}: SetItemsPropertyProps) => {
  model.items?.forEach((item) => {
    if (modelIdMap && item.id) {
      const _value = (value || {}) as Record<string, unknown>;
      modelIdMap[item.id].value = _value[item.name];
    }
  });
};

const apiTypeHandlers = {
  array: setArrayItemsProperty,
  object: setObjectItemsProperty,
};

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlers = apiTypeHandlers as any;
    const handler = handlers[model.apiType || ''];

    if (handler) {
      handler({ model, value, modelIdMap });
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
