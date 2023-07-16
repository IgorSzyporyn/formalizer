import deepmerge from 'deepmerge';
import { createModelObserve } from '../observable/create-model-observe';
import {
  FormalizedModelFlat,
  FormalizerCoreConfig,
  FormalizerCoreOptions,
} from '../typings/formalizer-types';
import {
  ClientModel,
  ExtensionInterface,
  ExtraProperties,
  FormalizedModel,
  ListenerProps,
  coreModelTypes,
} from '../typings/model-types';
import { applyPathAndIdToModel } from './apply-path-and-id-to-model';
import { extendClientModel } from './extend-client-model';
import { getModelValue } from './get-model-value';

const bailReports = (model: FormalizedModel, parentModel?: FormalizedModel) => {
  let bailEarly = false;

  // If trying to create a type that does not exist
  if (!coreModelTypes.includes(model.type)) {
    console.warn(
      `The model: "${model.name}" has an invalid type: "${model.type}"`
    );

    bailEarly = true;
  }

  // If parent exists and type is not accepted - bail and warn
  if (
    parentModel &&
    (!parentModel.accepts || !parentModel?.accepts?.includes(model.type))
  ) {
    console.warn(
      `The model: "${parentModel.id}" does not accept the child: "${model.name}" with the type "${model.type}"`
    );
    bailEarly = true;
  }

  return bailEarly;
};

export type CreateFormalizerModelResult = {
  model?: FormalizedModel;
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
};

type CreateFormalizerModelProps = {
  config?: FormalizerCoreConfig;
  dataParentId?: string;
  index?: number;
  model: ClientModel;
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  onModelItemChange: (props: ListenerProps) => void;
  options?: FormalizerCoreOptions;
  parentId?: string;
  path?: string;
};

export const createFormalizerModel = ({
  config = {},
  dataParentId,
  index,
  model: _model,
  modelIdMap = {},
  modelPathMap = {},
  onModelItemChange,
  options,
  parentId,
  path: _path,
}: CreateFormalizerModelProps): CreateFormalizerModelResult => {
  const parentModel = modelIdMap[parentId || ''];
  const dataParentModel = modelIdMap[dataParentId || ''];
  const { core: customCore, extension } = config;

  // For root we have to ensure type is "root"
  if (!parentId) {
    _model.type = 'root';
  }

  // Bail early scenarios as we touch directly into modelIdMap object
  const bailEarly = bailReports(_model, parentModel);
  if (bailEarly) {
    return { model: undefined, modelIdMap };
  }

  // Extend the core model on to the client model to start the
  // creation of the formalizer model
  const instanceModel = extendClientModel(_model, customCore);

  const path = applyPathAndIdToModel({
    dataParentId,
    index,
    model: instanceModel,
    modelIdMap,
    parentId,
    path: _path,
  });

  if (parentModel) {
    instanceModel.parentId = parentModel.id;
  }

  if (dataParentModel) {
    instanceModel.dataParentId = dataParentModel.id;
  }

  // Keep track of current dataParentModel
  if (instanceModel.apiType === 'object' || instanceModel.apiType === 'array') {
    dataParentId = instanceModel.id;
  }

  // Ensure value property is set if a defaultValue is provided but no value
  if (
    instanceModel.defaultValue !== undefined &&
    instanceModel.value === undefined
  ) {
    instanceModel.value = instanceModel.defaultValue;
  }

  // Add extension model on to the formalized model
  // We null assert because type needs to be optional, but we have
  // ensured that this property is set via the extending from core
  if (extension) {
    const extensionModel = extension[instanceModel.type];
    const extraProperties = extensionModel?.extraProperties;
    const registerExtraProperties = extensionModel?.registerExtraProperties;
    let registeredExtraProperties: ExtraProperties = {};

    // Allow extension to perform a run-time tweak of extraProperties
    // with the supplied model in hand
    if (registerExtraProperties) {
      registeredExtraProperties =
        extensionModel.registerExtraProperties?.(instanceModel) || {};

      extensionModel.extraProperties = deepmerge(
        extraProperties || {},
        registeredExtraProperties
      );
    }

    if (extensionModel) {
      instanceModel.extension = extensionModel;
    }
  }

  // Add the formalized model to the flat dot notated map
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  modelIdMap[instanceModel.id!] = instanceModel;

  if (instanceModel.path) {
    modelPathMap[instanceModel.path] = instanceModel;
  }

  // Run through all items to make this recursive for all items and
  // children of items
  if (instanceModel.items && instanceModel.items.length > 0) {
    instanceModel.items = createFormalizerModels({
      dataParentId,
      config,
      modelIdMap,
      modelPathMap: modelPathMap,
      models: instanceModel.items,
      onModelItemChange,
      options,
      parentId: instanceModel.id,
      path,
    });
  }

  // Ensure value is set properly for data parent type models
  const modelValue = getModelValue({ model: instanceModel, options });
  instanceModel.value = modelValue;

  // Set the __formalized__ flag
  instanceModel.__formalized__ = true;

  // Create the observable model that will enable listeners on each model
  const observableModel = createModelObserve({
    config,
    index,
    model: instanceModel,
    modelIdMap,
    modelPathMap,
    onModelItemChange,
    options,
    path,
  });

  // Update the formalized model to the flat dot notated map
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  modelIdMap[observableModel.id!] = observableModel;

  if (observableModel.path) {
    modelPathMap[observableModel.path] = observableModel;
  }

  return {
    model: observableModel,
    modelIdMap,
    modelPathMap,
  };
};

type CreateFormalizerModelsProps = {
  config?: FormalizerCoreConfig;
  dataParentId?: string;
  extension?: ExtensionInterface;
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  models: FormalizedModel[];
  onModelItemChange: (props: ListenerProps) => void;
  options?: FormalizerCoreOptions;
  parentId?: string;
  path?: string;
};

const createFormalizerModels = ({
  dataParentId,
  config,
  modelIdMap,
  modelPathMap,
  models,
  onModelItemChange,
  options,
  parentId,
  path,
}: CreateFormalizerModelsProps) => {
  const formalizedModels = models
    .map((model, index) => {
      const { model: _model } = createFormalizerModel({
        model,
        parentId,
        modelIdMap,
        config,
        options,
        path,
        onModelItemChange,
        index,
        dataParentId,
        modelPathMap,
      });

      return _model;
    })
    .filter((f) => f !== undefined);

  return formalizedModels as FormalizedModel[];
};
