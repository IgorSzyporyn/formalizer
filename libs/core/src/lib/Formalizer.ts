import deepmerge from 'deepmerge';
import dot from 'dot-object';
import { cloneDeep, isArray, isEqual, isObject } from 'lodash';
import {
  FormalizerConfig,
  FormalizerCustomConfig,
  FormalizerModelIdMap,
  FormalizerModelPathMap,
  FormalizerModelStateMap,
  FormalizerOptions,
  FormalizerState,
} from './types/formalizer-types';
import {
  ApiValue,
  ClientModel,
  ExtensionInterface,
  FormalizedModel,
  ListenerProps,
} from './types/model-types';
import { applyDependencies } from './utils/apply-dependencies';
import {
  CreateFormalizerModelResult,
  createFormalizerModel,
} from './utils/create-formalizer-model';
import { getCoreModels } from './utils/get-core-models';

const defaultOptions: FormalizerOptions = {
  emptyValues: true,
};

const defaultFormalizerState: FormalizerState = {
  dirty: false,
  dirtyMap: {},
  errors: {},
  touched: false,
  touchedMap: {},
  valid: true,
};

export class FormalizerCore {
  private model: FormalizedModel | undefined;
  private modelIdMap: FormalizerModelIdMap | undefined;
  private modelPathMap: FormalizerModelPathMap | undefined;
  private modelStateMap: FormalizerModelStateMap | undefined;
  private state: FormalizerState = { ...defaultFormalizerState };
  private options: FormalizerOptions = { ...defaultOptions };
  private clientModel: ClientModel | undefined;
  private extension: ExtensionInterface | undefined;
  private customConfig: FormalizerCustomConfig | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private value: Record<string, any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initialValue: Record<string, any> | undefined;
  private initializing = true;

  constructor({ options, model, extension, custom }: FormalizerConfig) {
    this.setOptions(options);

    if (model) {
      const formalizer = this.createModel({ model, extension });

      this.setClientModel(model);
      this.setModel(formalizer);
    }

    this.setExtension(extension);
    this.setCustomConfig(custom);
    this.initValues();
    this.initState();

    this.initializing = false;
  }

  private setClientModel = (model?: ClientModel) => {
    this.clientModel = model;
  };

  private setOptions = (options?: FormalizerOptions) => {
    this.options = deepmerge(this.options, options || {});
  };

  private setCustomConfig = (customConfig?: FormalizerCustomConfig) => {
    this.customConfig = customConfig;
  };

  private setExtension = (extension?: ExtensionInterface) => {
    this.extension = extension;
  };

  private setModel = (formalizer: CreateFormalizerModelResult = {}) => {
    const { onModelChange } = this.getOptions();

    this.model = formalizer.model;

    this.setModelIdMap(formalizer.model ? formalizer.modelIdMap : undefined);
    this.setModelPathMap(
      formalizer.model ? formalizer.modelPathMap : undefined
    );

    onModelChange?.(formalizer);
  };

  private setModelIdMap = (modelIdMap?: FormalizerModelIdMap) => {
    this.modelIdMap = modelIdMap;
  };

  private setModelPathMap = (modelPathMap?: FormalizerModelIdMap) => {
    this.modelPathMap = modelPathMap;
  };

  private getValueMap = () => {
    const modelIdMap = this.getModelIdMap();
    const options = this.getOptions();
    const valueMap: Record<string, ApiValue | undefined> = {};

    for (const [_, model] of Object.entries(modelIdMap || {})) {
      const apiType = model.apiType;
      const isDataParent = apiType === 'object' || apiType === 'array';
      const allowDataGather = !isDataParent;
      const gatherEmptyValues = options.emptyValues;

      // Convert from whatever is stored
      const value = model.valueToRaw?.({ model, value: model.value, options });

      if (
        allowDataGather &&
        !gatherEmptyValues &&
        value !== undefined &&
        model.path
      ) {
        valueMap[model.path] = value;
      } else if (allowDataGather && gatherEmptyValues && model.path) {
        valueMap[model.path] = value;
      }
    }

    return valueMap;
  };

  private initValues = () => {
    const { initialValue } = this.getOptions();
    const valueMap = this.getValueMap();
    const defaultValue = dot.object(valueMap) as Record<string, unknown>;

    if (initialValue) {
      const values = deepmerge(defaultValue, initialValue);

      this.applyValueToModel(values);
      this.setInitialValue(values);
      this.setValue(values);
    } else {
      this.applyValueToModel(defaultValue);
      this.setInitialValue(defaultValue);
      this.setValue(defaultValue);
    }
  };

  private applyValueToModel = (value: Record<string, unknown>) => {
    const modelPathMap = this.getModelPathMap() || {};

    const looper = ({ value, path }: { value: unknown; path?: string }) => {
      switch (typeof value) {
        case 'object':
          if (isArray(value)) {
            if (path) {
              modelPathMap[path].value = value as ApiValue;
            }

            value.forEach((_value, _index) => {
              looper({
                value: _value,
                path: `${path}[${_index}]`,
              });
            });
          } else if (isObject(value)) {
            if (path) {
              modelPathMap[path].value = value as ApiValue;
            }

            for (const [_key, _value] of Object.entries(value)) {
              looper({ value: _value, path: path ? `${path}.${_key}` : _key });
            }
          }
          break;
        default:
          if (path) {
            modelPathMap[path].value = value as ApiValue;
          }
          break;
      }
    };

    looper({ value });
  };

  private setValue = (value: Record<string, unknown>) => {
    if (!isEqual(value, this.value)) {
      this.value = value;
    }
  };

  private setInitialValue = (initialValue: Record<string, unknown>) => {
    this.initialValue = initialValue;
  };

  private setState = (state: FormalizerState) => {
    if (!isEqual(state, this.state)) {
      this.state = state;
    }
  };

  private setModelStateMap = (modelStateMap: FormalizerModelStateMap) => {
    let newState = cloneDeep(defaultFormalizerState);

    for (const [id, modelState] of Object.entries(modelStateMap)) {
      if (modelState.touched) {
        newState = {
          ...newState,
          touched: true,
          touchedMap: { ...newState.touchedMap, [id]: true },
        };
      }

      if (modelState.dirty) {
        newState = {
          ...newState,
          dirty: true,
          dirtyMap: { ...newState.dirtyMap, [id]: true },
        };
      }

      // @TODO - implement the validity check and error when done in model
    }

    this.modelStateMap = modelStateMap;
    this.setState(newState);
  };

  private initState = () => {
    const modelIdMap = this.getModelIdMap();
    const modelStateMap: FormalizerModelStateMap = {};

    for (const [id, model] of Object.entries(modelIdMap || {})) {
      modelStateMap[id] = {
        dirty: false,
        error: undefined,
        initialValue: cloneDeep(model.value),
        touched: false,
        valid: true,
      };
    }

    const state: FormalizerState = {
      dirty: false,
      dirtyMap: {},
      errors: {},
      touched: false,
      touchedMap: {},
      valid: true,
    };

    this.setState(state);
    this.setModelStateMap(modelStateMap);
  };

  getExtension = () => this.extension;
  getClientModel = () => this.clientModel;
  getOptions = () => this.options || {};
  getModelIdMap = () => this.modelIdMap;
  getModelPathMap = () => this.modelPathMap;
  getCustomConfig = () => this.customConfig;
  getValue = () => {
    return this.value;
  };
  getInitialValue = () => this.initialValue;
  getState = () => this.state;
  getModelStateMap = () => this.modelStateMap;
  getModel = (id?: string) => {
    const modelIdMap = this.getModelIdMap();

    if (modelIdMap && id) {
      return modelIdMap[id] || null;
    }

    return this.model;
  };
  getCoreModels = () => {
    const customCore = cloneDeep(this.getCustomConfig()?.core);
    const coreModels = getCoreModels(customCore);

    return coreModels;
  };

  getModelJSON = () => {
    return JSON.parse(JSON.stringify(this.getModel()));
  };

  private createModel = ({ model, extension }: FormalizerConfig) => {
    if (!model) return undefined;

    const customConfig = this.getCustomConfig() || {};
    const options = this.getOptions();

    const formalizerModel = createFormalizerModel({
      customCoreModel: customConfig.core,
      model,
      extension,
      options,
      onModelItemChange: this.handleModelChange,
    });

    applyDependencies(formalizerModel);

    return formalizerModel.model ? formalizerModel : undefined;
  };

  addItemToModel = (item: ClientModel, parentId: string) => {
    const parentModel = this.getModel(parentId);
    const rootModel = this.getModel();
    const extension = this.getExtension();
    const options = this.getOptions();

    if (!parentModel || !rootModel) {
      return false;
    }

    if (!parentModel.items) {
      parentModel.items = [];
    }

    parentModel.items.push(item);

    const formalizer = this.createModel({
      model: rootModel,
      extension,
      options,
    });

    this.setModel(formalizer);

    return true;
  };

  updateModel = (newModel: ClientModel) => {
    const extension = this.getExtension();
    const options = this.getOptions();

    const formalizer = this.createModel({
      model: newModel,
      extension,
      options,
    });

    this.setModel(formalizer);
  };

  handleModelChange = (props: ListenerProps) => {
    if (this.initializing) return;

    const modelStateMap = this.getModelStateMap() || {};
    const { onModelChange } = this.getOptions();

    if (props.property === 'value') {
      const valueMap = this.getValueMap();
      const value = dot.object(valueMap) as Record<string, unknown>;
      const item = props.model;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const stateItem = modelStateMap[item.id!];

      // Handle state management for model and formalizer class instance
      stateItem.touched = true;
      stateItem.dirty = !isEqual(item.value, stateItem.initialValue);

      item.dirty = stateItem.dirty;
      item.touched = stateItem.touched;
      // @TODO - add valid and error

      this.setValue(value);
      this.setModelStateMap(modelStateMap);
    }

    onModelChange?.({
      model: this.getModel(),
      modelIdMap: this.getModelIdMap(),
      modelPathMap: this.getModelPathMap(),
      modelStateMap: this.getModelStateMap(),
      state: this.getState(),
      value: this.getValue(),
      props,
    });

    return;
  };
}

export type Formalizer = typeof FormalizerCore;
