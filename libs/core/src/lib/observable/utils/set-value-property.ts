import { isEqual } from 'lodash';
import { ListenerCallback } from '../../typings/model-types';
import { propagateValueProperty } from './propagate-value-property';
import { CreateObjectObserveHandlerProps } from './shared-types';

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

  if (!isEqual(newValue, model.value)) {
    model.value = newValue;
    model.touched = true;
    model.dirty = !isEqual(newValue, model.initialValue);

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
