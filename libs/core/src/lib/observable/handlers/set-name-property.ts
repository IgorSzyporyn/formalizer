import { ListenerCallback } from '../../typings/model-types';
import { CreateObjectObserveHandlerProps } from '../typings/shared-types';
import { updateRelations } from '../utils/update-relations';

type SetNamePropertyProps = {
  name: string;
  onChange: ListenerCallback;
} & CreateObjectObserveHandlerProps;

export const setNameProperty = ({
  model,
  name,
  onChange,
  modelIdMap,
  ...props
}: SetNamePropertyProps) => {
  let isAllowedName = true;
  let itemIndexInParent = 0;
  const parentModel = modelIdMap?.[model.parentId || ''];

  if (parentModel) {
    parentModel.items?.forEach((item, index) => {
      if (item.id === model.id) {
        itemIndexInParent = index;
      } else if (item.name === model.name) {
        isAllowedName = false;
      }
    });
  }

  if (!isAllowedName) {
    throw new Error(
      `The model ${model.id} can not be renamed to ${name} due to existing model with same name`
    );
  } else {
    model.name = name;

    updateRelations({
      ...props,
      model,
      index: itemIndexInParent,
      parentId: model.parentId,
      modelIdMap,
    });

    model.items?.forEach((item, index) => {
      propagateNameChangeToChild({
        ...props,
        model: item,
        index,
        parentId: model.id,
        modelIdMap,
      });
    });

    onChange({ model, property: 'name', value: name });
  }
};

const propagateNameChangeToChild = ({
  model,
  ...props
}: CreateObjectObserveHandlerProps) => {
  updateRelations({
    ...props,
    model,
  });

  model.items?.forEach((item, index) => {
    propagateNameChangeToChild({
      ...props,
      model: item,
      index,
      parentId: model.id,
    });
  });
};
