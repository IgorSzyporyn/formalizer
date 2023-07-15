/**
 * FormalizerCore is a powerful utility for managing the state of complex form models.
 * It handles the nitty-gritty of updating and maintaining the state of the form model
 * so that you can focus on implementing the business logic of your application.
 */

import deepmerge from 'deepmerge';
import dot from 'dot-object';
import { isArray, isObject } from 'lodash';
import {
  FormalizedModelFlat,
  FormalizerCoreConfig,
  FormalizerCoreOptions,
  FormalizerCoreParams,
  FormalizerCoreState,
} from './types/formalizer-types';
import {
  ApiValue,
  ClientModel,
  FormalizedModel,
  ListenerProps,
} from './types/model-types';
import { applyDependencies } from './utils/apply-dependencies';
import { createFormalizerModel } from './utils/create-formalizer-model';
import { applyValues } from './utils/apply-values';
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
    ...options
  }: FormalizerCoreParams) {
    this.setOptions(options);
    this.setConfig({ model, core, extension, initialValue });

    if (model) {
      const formalizer = this.createModel({ model, extension });
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

    for (const [_, model] of Object.entries(modelPathMap)) {
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

    if (modelIdMap && modelId) {
      return modelIdMap[modelId] || null;
    }

    return this.model;
  };

  getModelJSON = (modelId?: string) => {
    const model = this.getModel(modelId);
    const stringified = JSON.stringify(model);
    const modelJSON = JSON.parse(stringified);

    return modelJSON;
  };

  private createModel = ({ model, extension }: FormalizerCoreParams) => {
    if (!model) return undefined;

    const options = this.getOptions();
    const config = this.getConfig();

    const formalizer = createFormalizerModel({
      customCoreModel: config.core,
      model,
      extension,
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
      model: this.getModel(),
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

  removeModelById = (modelId: string) => {
    // Prevent removing the root model
    if (modelId === this.getModel()?.id) {
      throw new Error('Cannot remove root model');
    }

    const modelIdMap = this.getModelIdMap();

    if (!modelIdMap) {
      throw new Error('Model ID map is not defined');
    }

    const modelToRemove = modelIdMap[modelId];

    if (!modelToRemove) {
      throw new Error(`No model found for the id: ${modelId}`);
    }

    const parentModelId = modelToRemove.parent;

    if (!parentModelId) {
      throw new Error(`No parent found for the model with id: ${modelId}`);
    }

    const parentModel = modelIdMap[parentModelId];

    if (!parentModel) {
      throw new Error(`No model found for the parent id: ${parentModelId}`);
    }

    if (!Array.isArray(parentModel.items)) {
      throw new Error(`Parent model does not contain any items`);
    }

    // Filter out the model to remove
    parentModel.items = parentModel.items.filter((item) => item.id !== modelId);
  };

  removeModel = (model: FormalizedModel) => {
    if (model.id) {
      this.removeModelById(model.id);
    } else {
      throw new Error('The model has no id');
    }
  };
}

export type Formalizer = typeof FormalizerCore;
