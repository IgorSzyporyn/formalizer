import { cloneDeep } from 'lodash';
import { CreateObjectObserveHandlerProps } from '../typings/shared-types';

type PropagateValuePropertyProps = {
  value: unknown;
  parentId: string;
} & CreateObjectObserveHandlerProps;

export const propagateValueProperty = ({
  modelIdMap,
  model,
  value,
  parentId,
}: PropagateValuePropertyProps) => {
  const parentModel = modelIdMap?.[parentId];

  if (parentModel) {
    if (parentModel.apiType === 'array') {
      const parentValue = (parentModel.value || []) as [];
      let index = -1;

      parentModel.items?.some((item, _index) => {
        if (item.id === model.id) {
          index = _index;
        }

        return index !== -1;
      });

      const cloneValue = cloneDeep(parentValue);
      cloneValue[index] = value as never;
      parentModel.value = cloneValue;

      parentValue[index] = model.value as never;
    }

    if (parentModel.apiType === 'object') {
      const parentValue = (parentModel.value || {}) as Record<string, unknown>;

      const cloneValue = cloneDeep(parentValue);
      cloneValue[model.name] = value;
      parentModel.value = cloneValue;
    }
  }
};
