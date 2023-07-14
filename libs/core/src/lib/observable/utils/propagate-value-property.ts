import { cloneDeep } from 'lodash';
import { FormalizerModelIdMap } from '../../types/formalizer-types';
import { FormalizedModel } from '../../types/model-types';

type PropagateValuePropertyProps = {
  model: FormalizedModel;
  modelIdMap: FormalizerModelIdMap;
  value: unknown;
  parentId: string;
};

export const propagateValueProperty = ({
  modelIdMap,
  model,
  value,
  parentId,
}: PropagateValuePropertyProps) => {
  const parentModel = modelIdMap[parentId];

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