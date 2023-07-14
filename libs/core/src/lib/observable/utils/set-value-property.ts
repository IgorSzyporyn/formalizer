import { isEqual } from 'lodash';
import {
  FormalizerModelIdMap,
  FormalizerOptions,
} from '../../types/formalizer-types';
import { FormalizedModel, ListenerCallback } from '../../types/model-types';
import { propagateValueProperty } from './propagate-value-property';

type SetValuePropertyProps = {
  model: FormalizedModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  onChange: ListenerCallback;
  modelIdMap: FormalizerModelIdMap;
  options?: FormalizerOptions;
};

export const setValueProperty = ({
  model,
  value,
  modelIdMap,
  onChange,
  options,
}: SetValuePropertyProps) => {
  const newValue = model.valueToRaw?.({ value, model, options }) as never;

  if (!isEqual(newValue, model.value)) {
    model.value = newValue;

    onChange({ model, property: 'value', value: newValue });

    switch (model.apiType) {
      case 'array':
        model.items?.forEach((item, index) => {
          const _value = (value || []) as [];
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          modelIdMap[item.id!].value = _value[index];
        });
        break;
      case 'object':
        model.items?.forEach((item) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const _value = (value || {}) as Record<string, any>;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          modelIdMap[item.id!].value = _value[item.name];
        });
        break;
      default:
        break;
    }

    // Propagate the value change up to the dataParent
    if (model.apiType !== 'none' && model.dataParent) {
      propagateValueProperty({
        model,
        modelIdMap,
        value,
        parentId: model.dataParent,
      });
    }
  }
};
