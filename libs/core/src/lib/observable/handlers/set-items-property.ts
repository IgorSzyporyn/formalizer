import {
  Dependency,
  FormalizedModel,
  ListenerProps,
} from '../../typings/model-types';
import {
  applyDependencies,
  createDependencyListenerId,
} from '../../utils/apply-dependencies';
import { applyPathAndIdToModel } from '../../utils/apply-path-and-id-to-model';
import { applyValues } from '../../utils/apply-values';
import { createFormalizerModel } from '../../utils/create-formalizer-model';
import { CreateObjectObserveHandlerProps } from '../typings/shared-types';
import { setValueProperty } from './set-value-property';

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
};

const handleAddingItems = ({
  model,
  items,
  onChange,
  ...rest
}: SetItemsPropertyProps): void => {
  let newItems: FormalizedModel[] = [];

  const isAddedModel = (item: FormalizedModel) =>
    !item.parentId || item.parentId !== model.id || !item.__formalized__;

  const preparedModelsArray = items.reduce(
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

          rest.modelIdMap = formalized.modelIdMap;
          rest.modelPathMap = formalized.modelPathMap;

          if (formalized.model) {
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
        }
      }

      return acc;
    },
    new Array(items.length)
  );

  newItems = preparedModelsArray;
  model.items = newItems;

  onChange({ model, property: 'items', value: newItems });
  applyValues(rest);
};

const handleRemovingItems = ({
  model,
  items,
  onChange,
  ...rest
}: SetItemsPropertyProps): void => {
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

      mappedModel.dependencies = newDependencies;
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

  onChange({ model, property: 'items', value: items });
  applyValues(rest);
};

const handleShufflingItems = ({
  model,
  items,
  onChange,
  ...rest
}: SetItemsPropertyProps): void => {
  const preparedModelsArray: FormalizedModel[] = [];
  const preparedValue: unknown[] = [];

  items.forEach((item, index) => {
    const dataParentId = model.path ? model.id : model.dataParentId;
    const dataParentModel = rest.modelIdMap?.[dataParentId || ''];

    if (!model.accepts?.includes(item.type)) {
      throw Error(
        `Attempting to an unaccepted item (${item.id}) on to ${model.id}`
      );
    }

    if (!item.__formalized__) {
      const formalized = createFormalizerModel({
        ...rest,
        model: item,
        parentId: model.id,
        index,
        dataParentId,
      });

      rest.modelIdMap = formalized.modelIdMap;
      rest.modelPathMap = formalized.modelPathMap;

      if (formalized.model) {
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

  onChange({ model, property: 'items', value: preparedModelsArray });
  applyValues(rest);
};

const updateRelations = ({
  model,
  ...rest
}: CreateObjectObserveHandlerProps): void => {
  const oldItemId = model.id;

  applyPathAndIdToModel({ ...rest, model });

  updateDependencies(rest.modelIdMap, oldItemId, model.id);
};

const updateDependencies = (
  modelIdMap: Record<string, FormalizedModel> | undefined,
  oldItemId: string | undefined,
  newId: string | undefined
): void => {
  Object.values(modelIdMap ?? {}).forEach((mappedModel) => {
    mappedModel.dependencies?.forEach((dependency) => {
      if (dependency.id === oldItemId && newId) {
        dependency.id = newId;
      }
    });
  });
};
