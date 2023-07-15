import { FormalizedModel, ListenerCallback } from '../../types/model-types';
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

  const isAddedModel = (item: FormalizedModel) =>
    !item.parent || item.parent !== model.id || !item.__formalized__;

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
    const newItems: FormalizedModel[] = [];
    const isAdding = model.items.length < items.length;

    if (isAdding) {
      // Find the model(s) we are adding - either it will be a client model
      // or it will have wrong parent (or no parent)
      const addedModels = items.filter(isAddedModel);
      const oldModels = items.filter((item) => !isAddedModel(item));

      console.log(addedModels, oldModels);

      // Go through all added models and inject them into the formalizer model
      addedModels.forEach((item, index) => {
        const isClientModel = !item.__formalized__;

        if (isClientModel) {
          // If a client model we inject by formalizing quite simply
          const { model: formalizedModel } = createFormalizerModel({
            model: item,
            parent: model,
            index,
            ...rest,
          });

          if (formalizedModel) {
            newItems.push(formalizedModel);
          }
        } else {
          console.log('hello');
        }
      });
    } else {
      // Remove this value from the chain
    }

    model.items = newItems;

    onChange({ model, property: 'items', value: newItems });
  }
};
