import { FormalizedModelFlat } from '../../typings/formalizer-types';
import { ListenerProps } from '../../typings/model-types';

type PropagateItemsPropertyProps = {
  onChange: (props: ListenerProps) => void;
  modelIdMap?: FormalizedModelFlat;
  modelId?: string;
};

export const propagateItemsProperty = ({
  modelIdMap,
  modelId: parentId,
  onChange,
}: PropagateItemsPropertyProps) => {
  if (modelIdMap && parentId) {
    const model = modelIdMap[parentId];
    const items = model.items;

    onChange({ model: model, property: 'items', value: items });

    if (model.parentId) {
      propagateItemsProperty({
        modelId: model.parentId,
        modelIdMap,
        onChange,
      });
    }
  }
};
