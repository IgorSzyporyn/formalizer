import { Dependency, FormalizedModel, ListenerProps } from '../../typings/model-types';
import {
  applyDependencies,
  createDependencyListenerId,
} from '../../utils/apply-dependencies';
import { applyValues } from '../../utils/apply-values';
import { createFormalizerModel } from '../../utils/create-formalizer-model';
import { CreateObjectObserveHandlerProps } from '../typings/shared-types';
import { propagateItemsProperty } from '../utils/propagate-items-property';
import { updateRelations } from '../utils/update-relations';

interface SetItemsPropertyProps extends CreateObjectObserveHandlerProps {
  items: FormalizedModel[];
  onChange: (props: ListenerProps) => void;
}

export const setItemsProperty = ({
  model,
  items,
  onChange,
  ...rest
}: SetItemsPropertyProps): void => {
  model.items = model.items ?? [];

  switch (true) {
    case model.items.length < items.length:
      handleAddingItems({ model, items, onChange, ...rest });
      break;
    case model.items.length > items.length:
      handleRemovingItems({ model, items, onChange, ...rest });
      break;
    default:
      handleShufflingItems({ model, items, onChange, ...rest });
  }

  onChange({ model, property: 'items', value: model.items });

  propagateItemsProperty({
    onChange,
    modelIdMap: rest.modelIdMap,
    modelId: model.parentId,
  });

  applyValues(rest);
};

const handleAddingItems = ({ model, items, ...rest }: SetItemsPropertyProps): void => {
  const isAddedModel = (item: FormalizedModel) =>
    !item.parentId || item.parentId !== model.id || !item.__formalized__;

  const newItems = items.reduce(
    (acc: FormalizedModel[], item: FormalizedModel, index: number) => {
      const dataParentId = model.path ? model.id : model.dataParentId;
      const dataParentModel = rest.modelIdMap?.[dataParentId || ''];

      if (!isAddedModel(item)) {
        acc[index] = item;
      } else {
        if (!item.__formalized__) {
          const formalized = createFormalizerModel({
            ...rest,
            model: item,
            parentId: model.id,
            index,
            dataParentId,
          });

          if (formalized.model) {
            if (rest.modelIdMap && rest.modelPathMap) {
              rest.modelIdMap[formalized.model.id || ''] = formalized.model;
              rest.modelPathMap[formalized.model.path || ''] = formalized.model;
            }

            applyDependencies({ ...rest, model: item });

            acc[index] = formalized.model;
          }
        } else {
          if (!model.accepts?.includes(item.type)) {
            throw Error(
              `Attempting to add an unaccepted item (${item.id}) on to ${model.id}`
            );
          }

          updateRelations({
            ...rest,
            model: item,
            index,
            path: dataParentModel?.path,
            dataParentId,
            parentId: model.id,
          });

          if (item.items && item.items.length > 0) {
            propagateItemsChangeToChildren({
              ...rest,
              model: item,
              index,
              path: dataParentModel?.path,
              dataParentId,
              parentId: model.id,
            });
          }

          acc[index] = item;
        }
      }

      return acc;
    },
    new Array(items.length)
  );

  model.items = newItems;
};

const handleRemovingItems = ({ model, items, ...rest }: SetItemsPropertyProps): void => {
  const preparedValue: unknown[] = [];

  const removedItems = model.items?.filter(
    (item) => !items.map((m) => m.id).includes(item.id)
  );

  removedItems?.forEach((item) => {
    for (const mappedModel of Object.values(rest.modelIdMap || {})) {
      const newDependencies: Dependency[] = [];

      mappedModel.dependencies?.forEach((dependency) => {
        if (dependency.id !== item.id) {
          newDependencies.push(dependency);
        } else {
          const listenerId = createDependencyListenerId(item, dependency);
          item.removeListener?.(listenerId);
        }
      });

      // @TODO: Removed models might have dependencies that needs to be cleared
      // Can I maybe reuse updateRelations?

      if (mappedModel.dependencies) {
        mappedModel.dependencies = newDependencies;
      } else if (!mappedModel.dependencies && newDependencies.length > 0) {
        mappedModel.dependencies = newDependencies;
      }
    }

    delete rest.modelIdMap?.[item.id || ''];
    delete rest.modelPathMap?.[item.path || ''];
  });

  const dataParentId = model.path ? model.id : model.dataParentId;
  const dataParentModel = rest.modelIdMap?.[dataParentId || ''];

  items.forEach((item, index) => {
    updateRelations({
      ...rest,
      model: item,
      index,
      path: dataParentModel?.path,
      dataParentId,
      parentId: model.id,
    });
    preparedValue.push(item.value);
  });

  model.items = items;
};

const handleShufflingItems = ({ model, items, ...rest }: SetItemsPropertyProps): void => {
  const preparedModelsArray: FormalizedModel[] = [];
  const preparedValue: unknown[] = [];

  items.forEach((item, index) => {
    const dataParentId = model.path ? model.id : model.dataParentId;
    const dataParentModel = rest.modelIdMap?.[dataParentId || ''];

    if (!model.accepts?.includes(item.type)) {
      throw Error(`Attempting to an unaccepted item (${item.id}) on to ${model.id}`);
    }

    if (!item.__formalized__) {
      const formalized = createFormalizerModel({
        ...rest,
        model: item,
        parentId: model.id,
        index,
        dataParentId,
      });

      if (formalized.model) {
        if (rest.modelIdMap && rest.modelPathMap) {
          rest.modelIdMap[formalized.model.id || ''] = formalized.model;
          rest.modelPathMap[formalized.model.path || ''] = formalized.model;
        }

        applyDependencies({ model: item, modelIdMap: formalized.modelIdMap });
        preparedModelsArray[index] = formalized.model;
      }
    } else {
      updateRelations({
        ...rest,
        model: item,
        index,
        path: dataParentModel?.path,
        dataParentId,
        parentId: model.id,
      });

      preparedModelsArray[index] = item;
    }

    preparedValue.push(item.value);
  });

  model.items = preparedModelsArray;
};

const propagateItemsChangeToChildren = ({
  model,
  ...rest
}: CreateObjectObserveHandlerProps) => {
  model.items?.forEach((item, index) => {
    const dataParentId = model.apiType === 'none' ? model.dataParentId : model.id;

    updateRelations({
      ...rest,
      dataParentId,
      index,
      parentId: item.parentId,
      model: item,
    });

    if (item.items && item.items.length > 0) {
      propagateItemsChangeToChildren({ ...rest, model: item });
    }
  });
};
