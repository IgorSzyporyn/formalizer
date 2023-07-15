import {
  Dependency,
  FormalizedModel,
  ListenerCallback,
} from '../../types/model-types';
import {
  applyDependencies,
  createDependencyListenerId,
} from '../../utils/apply-dependencies';
import { applyPathAndIdToModel } from '../../utils/apply-path-and-id-to-model';
import { applyValues } from '../../utils/apply-values';
import { createFormalizerModel } from '../../utils/create-formalizer-model';
import { CreateObjectObserveHandlerProps } from './shared-types';

type SetItemsPropertyProps = {
  items: FormalizedModel[];
  onChange: ListenerCallback;
} & CreateObjectObserveHandlerProps;

export const setItemsProperty = ({
  model,
  items,
  onChange,
  ...rest
}: SetItemsPropertyProps) => {
  let allowSetting = true;

  if (!Array.isArray(items)) {
    allowSetting = false;
    throw new Error(
      `Setting items to non array for ${model.id} is not allowed`
    );
  }

  if (!model.items) {
    model.items = [];
  }

  if (allowSetting) {
    let newItems: FormalizedModel[] = [];

    const isAdding = model.items.length < items.length;
    const isRemoving = model.items.length > items.length;
    const isShuffling = model.items.length === items.length;

    if (isAdding) {
      const isAddedModel = ({ item }: { item: FormalizedModel }) =>
        !item.parentId || item.parentId !== model.id || !item.__formalized__;

      const preparedModelsArray = new Array(items.length);

      // Place the old items in the items array at the right index position
      // in the prepared models array
      items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => !isAddedModel({ item }))
        .forEach(({ item, index }) => {
          preparedModelsArray[index] = item;
        });

      // Go through all the new model items and either place them if formalized
      // or formalize them and insert in the prepared model items array at the
      // right index position
      items
        .map((item, index) => ({ item, index }))
        .filter(isAddedModel)
        .forEach(({ item, index }) => {
          const dataParentId = model.path ? model.id : model.dataParentId;
          const dataParentModel = rest.modelIdMap?.[dataParentId || ''];

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
              applyDependencies({
                model: item,
                modelIdMap: formalized.modelIdMap,
              });

              applyValues(rest);

              preparedModelsArray[index] = formalized.model;
            }
          } else {
            // Check if this model item is allowed in parent
            if (!model.accepts?.includes(item.type)) {
              throw Error(
                `Attempting to an unaccepted item (${item.id}) on to ${model.id}`
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
        });

      newItems = preparedModelsArray;
      model.items = newItems;
      onChange({ model, property: 'items', value: newItems });
    } else if (isRemoving) {
      // Find the removed items
      const removedItems = model.items.filter((item) => {
        return !items.map((m) => m.id).includes(item.id);
      });

      // Remove all relations model has in dependencies, modelIdMap and modelPathMap
      removedItems.forEach((item) => {
        for (const [_, mappedModel] of Object.entries(rest.modelIdMap || {})) {
          const newDependencies: Dependency[] = [];

          mappedModel.dependencies?.forEach((dependency) => {
            if (dependency.id !== item.id) {
              newDependencies.push(dependency);
            } else {
              // Remove the listener for this dependency
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

      // Remaining items can have had their indexes moved and id and path must be
      // changed as well as dependencies and other relations must be maintained
      items.forEach((item, index) => {
        updateRelations({
          ...rest,
          model: item,
          index,
          path: dataParentModel?.path,
          dataParentId,
          parentId: model.id,
        });
      });

      newItems = items;
      model.items = newItems;
      onChange({ model, property: 'items', value: newItems });

      // Make sure the values are maintained in the tree
      // Apply values last or arrays and objects will fault in trying
      // to set values for items that are no longer there
      applyValues(rest);
    } else if (isShuffling) {
      // We could be given new client models as well as models
      // from other parents - no way of knowing for sure
      const preparedModelsArray = new Array(items.length);

      items.forEach((item, index) => {
        const dataParentId = model.path ? model.id : model.dataParentId;
        const dataParentModel = rest.modelIdMap?.[dataParentId || ''];

        if (!item.__formalized__) {
          // Brand new client model being pumped in
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
            applyDependencies({
              model: item,
              modelIdMap: formalized.modelIdMap,
            });

            applyValues(rest);

            preparedModelsArray[index] = formalized.model;
          }
        } else {
          // Can be internally moved item or from another parent
          if (item.parentId !== model.id) {
            // Moved here from another parent
            // Check if this model item is allowed in this parent
            if (!model.accepts?.includes(item.type)) {
              throw Error(
                `Attempting to an unaccepted item (${item.id}) on to ${model.id}`
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

            preparedModelsArray[index] = item;
          } else {
            // Moved around internally
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
        }
      });

      newItems = preparedModelsArray;
      model.items = newItems;
      onChange({ model, property: 'items', value: newItems });
    }
  }
};

const updateRelations = ({
  model,
  ...rest
}: CreateObjectObserveHandlerProps) => {
  // Store the old item and path as we need it to look for old references
  // to this item in the root model that need reference id/path updated
  const oldItemId = model.id;

  // This is apparently a moved item and will need to have new values
  // for id and path to keep track of placement in the root model structure
  applyPathAndIdToModel({
    ...rest,
    model,
  });

  // Dependencies needs updating of the id relation that has now changed
  // as we have a new parent and a new id/path
  for (const [_, mappedModel] of Object.entries(rest.modelIdMap || {})) {
    mappedModel.dependencies?.forEach((dependency, index, origin) => {
      if (dependency.id === oldItemId && model.id) {
        origin[index].id = model.id;
      }
    });
  }
};
