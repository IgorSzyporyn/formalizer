/**
 * FormalizerCore is a powerful utility for managing the state of complex form models.
 * It handles the nitty-gritty of updating and maintaining the state of the form model
 * so that you can focus on implementing the business logic of your application.
 *
 * Each core model type represents a specific type of data or input element in the
 * formalizer framework, allowing you to define and configure different types of models
 * for your application forms or data structures.
 */
import deepmerge from 'deepmerge';
import dot from 'dot-object';
import {
  FormalizedModelFlat,
  FormalizerCoreConfig,
  FormalizerCoreOptions,
  FormalizerCoreParams,
  FormalizerCoreState,
} from './typings/formalizer-types';
import {
  ClientModel,
  ClientPropertyType,
  FormalizedModel,
  ListenerProps,
} from './typings/model-types';
import { applyDependencies } from './utils/apply-dependencies';
import { applyValues } from './utils/apply-values';
import { createFormalizerModel } from './utils/create-formalizer-model';
import { getModelValueMap } from './utils/get-model-value-map';

export class FormalizerCore {
  private model: FormalizedModel | undefined;

  private options: FormalizerCoreOptions = { partialValues: true };
  private config: FormalizerCoreConfig = {};

  private initializing = true;

  constructor({
    model,
    core,
    extension,
    initialValue,
    onModelChange,
    ...options
  }: FormalizerCoreParams) {
    this.setOptions(options);
    this.setConfig({ model, core, extension, initialValue, onModelChange });

    if (model) {
      const formalizer = this.createModel({ model });
      this.setModel(formalizer?.model);
    }

    this.initializing = false;
  }

  private setOptions = (options?: FormalizerCoreOptions) => {
    this.options = deepmerge(this.options, options || {});
  };

  private setConfig = (config?: FormalizerCoreConfig) => {
    this.config = deepmerge(this.config, config || {});
  };

  private setModel = (model?: FormalizedModel) => {
    this.model = model;
  };

  getOptions = () => this.options || {};

  getConfig = () => this.config;

  getModelIdMap = () => {
    const rootModel = this.model;
    let modelIdMap: FormalizedModelFlat = {};

    if (rootModel) {
      modelIdMap = this.flattenModelByKey(rootModel, 'id').flattened;
    }

    return modelIdMap;
  };

  getModelPathMap = () => {
    const rootModel = this.model;
    let modelIdMap: FormalizedModelFlat = {};

    if (rootModel) {
      modelIdMap = this.flattenModelByKey(rootModel, 'path').flattened;
    }

    return modelIdMap;
  };

  getValue = () => {
    const modelIdMap = this.getModelIdMap();
    const options = this.getOptions();
    const valueMap = getModelValueMap({ modelIdMap, options });
    const value = dot.object(valueMap) as Record<string, unknown>;

    return value;
  };

  getState = () => {
    const modelPathMap = this.getModelPathMap();
    const state: FormalizerCoreState = {
      dirty: false,
      errors: {},
      touched: false,
      valid: true,
    };

    for (const model of Object.values(modelPathMap)) {
      if (model.dirty) {
        state.dirty = true;
      }

      if (model.touched) {
        state.touched = true;
      }
    }

    return state;
  };

  getModel = (modelId?: string) => {
    const modelIdMap = this.getModelIdMap();
    let model: FormalizedModel | undefined;

    if (modelIdMap && modelId) {
      model = modelIdMap[modelId];
    }

    return model;
  };

  getRootModel = () => {
    const rootModel = this.model;

    return rootModel;
  };

  getModelJSON = (modelId?: string) => {
    const model = this.getModel(modelId);
    const stringified = JSON.stringify(model);
    const modelJSON = JSON.parse(stringified);

    return modelJSON;
  };

  private createModel = ({ model }: FormalizerCoreParams) => {
    if (!model) return undefined;

    const options = this.getOptions();
    const config = this.getConfig();

    const formalizer = createFormalizerModel({
      config,
      model,
      options,
      onModelItemChange: this.handleModelChange,
    });

    applyDependencies(formalizer);

    applyValues({ ...formalizer, config, options });

    return formalizer.model ? formalizer : undefined;
  };

  private handleModelChange = (props: ListenerProps) => {
    if (this.initializing) return;

    const { onModelChange } = this.getConfig();

    onModelChange?.({
      model: this.getRootModel(),
      modelIdMap: this.getModelIdMap(),
      modelPathMap: this.getModelPathMap(),
      state: this.getState(),
      value: this.getValue(),
      props,
    });

    return;
  };

  private flattenModelByKey = (
    model: FormalizedModel,
    keyProperty: 'id' | 'path',
    flattened: FormalizedModelFlat = {}
  ) => {
    const flatten = this.flattenModelByKey;

    const key = model[keyProperty];

    if (key) {
      flattened[key] = model;
    }

    if (model.items) {
      model.items.forEach((item) => {
        flatten(item, keyProperty, flattened);
      });
    }

    return { model, flattened, keyProperty };
  };

  updateModel = ({
    id,
    properties,
  }: {
    id?: string;
    properties?: ClientModel;
  }) => {
    const model = this.getModel(id);

    if (
      model !== null &&
      model !== undefined &&
      properties !== null &&
      properties !== undefined &&
      Object.keys(properties).length > 0
    ) {
      for (const [property, value] of Object.entries(properties)) {
        model[property as ClientPropertyType] = value;
      }
    }
  };

  addModel = (model: ClientModel, parentId: string) => {
    const parentModel = this.getModel(parentId);

    if (!parentModel) {
      return false;
    }

    if (!parentModel.items) {
      parentModel.items = [];
    }

    if (!parentModel.accepts?.includes(model.type)) {
      throw Error(
        `The model ${parentModel.id} does not accept the type ${model.type} from ${model.name}`
      );
    }

    parentModel.items = [...parentModel.items, model];

    return true;
  };

  removeModel = (modelId: string) => {
    // Prevent removing the root model
    if (modelId === this.getRootModel()?.id) {
      throw new Error('Cannot remove root model');
    }

    const modelToRemove = this.getModel(modelId);

    if (!modelToRemove) {
      throw new Error(`No model found for the id: ${modelId}`);
    }

    const parentModelId = modelToRemove.parentId;

    if (!parentModelId) {
      throw new Error(
        `No parent model found for the model with id: ${modelId}`
      );
    }

    const parentModel = this.getModel(parentModelId);

    if (!parentModel) {
      throw new Error(`No model found for the parent id: ${parentModelId}`);
    }

    if (!Array.isArray(parentModel.items)) {
      throw new Error(`Parent model does not contain any items`);
    }

    // Filter out the model to remove
    parentModel.items = parentModel.items.filter((item) => item.id !== modelId);
  };

  moveModel = (modelId: string, parentId: string, newPosition: number) => {
    const model = this.getModel(modelId);
    const parentModel = this.getModel(parentId);

    if (!model || !parentModel) {
      return;
    }

    if (model.parentId === parentModel.id) {
      // Move inside the same items array
      const parentItems = parentModel.items;
      if (!parentItems) {
        return;
      }

      const currentPosition = parentItems.findIndex(
        (item) => item.id === modelId
      );

      if (currentPosition === -1) {
        return;
      }

      const newItems = [...parentItems];
      newItems.splice(newPosition, 0, newItems.splice(currentPosition, 1)[0]);
      parentModel.items = newItems;
    } else {
      // Move to a different parent
      const sourceParentModel = this.getModel(model.parentId);
      if (!sourceParentModel || !sourceParentModel.items) {
        return;
      }

      const sourceItems = sourceParentModel.items;
      const targetItems = parentModel.items;

      if (!targetItems) {
        return;
      }

      const sourceIndex = sourceItems.findIndex((item) => item.id === modelId);

      if (sourceIndex === -1) {
        return;
      }

      const sourceItem = sourceItems[sourceIndex];

      // Remove from the source parent's items array
      sourceParentModel.items = sourceItems.filter(
        (item) => item.id !== modelId
      );

      // Insert into the target parent's items array at the specified position
      targetItems.splice(newPosition, 0, sourceItem);

      // Update the model's parentId
      model.parentId = parentId;
    }
  };
}

export type Formalizer = typeof FormalizerCore;
