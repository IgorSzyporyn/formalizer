import deepmerge from 'deepmerge';
import { createModelObserve } from '../observable/create-model-observe';
import {
  FormalizedModelFlat,
  FormalizerCoreOptions,
} from '../types/formalizer-types';
import {
  ClientModel,
  CoreModelInterface,
  ExtensionInterface,
  ExtraProperties,
  FormalizedModel,
  ListenerProps,
  coreModelTypes,
} from '../types/model-types';
import { applyPathAndIdToModel } from './apply-path-and-id-to-model';
import { extendClientModel } from './extend-client-model';
import { getModelValue } from './get-model-value';

const bailReports = (model: FormalizedModel, parent?: FormalizedModel) => {
  let bailEarly = false;

  // If trying to create a type that does not exist
  if (!coreModelTypes.includes(model.type)) {
    console.warn(
      `The model: "${model.name}" has an invalid type: "${model.type}"`
    );

    bailEarly = true;
  }

  // If parent exists and type is not accepted - bail and warn
  if (parent && (!parent.accepts || !parent?.accepts?.includes(model.type))) {
    console.warn(
      `The model: "${parent.id}" does not accept the child: "${model.name}" with the type "${model.type}"`
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
  customCoreModel?: CoreModelInterface;
  dataParentModel?: FormalizedModel;
  extension?: ExtensionInterface;
  index?: number;
  model: ClientModel;
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  onModelItemChange: (props: ListenerProps) => void;
  options?: FormalizerCoreOptions;
  parent?: FormalizedModel;
  path?: string;
};

export const createFormalizerModel = ({
  customCoreModel,
  dataParentModel,
  extension,
  index,
  model: _model,
  modelIdMap = {},
  modelPathMap = {},
  onModelItemChange,
  options,
  parent,
  path: _path,
}: CreateFormalizerModelProps): CreateFormalizerModelResult => {
  // For root we have to ensure type is "root"
  if (!parent) {
    _model.type = 'root';
  }

  // Bail early scenarios as we touch directly into modelIdMap object
  const bailEarly = bailReports(_model, parent);
  if (bailEarly) {
    return { model: undefined, modelIdMap };
  }

  // Extend the core model on to the client model to start the
  // creation of the formalizer model
  const instanceModel = extendClientModel(_model, customCoreModel);

  const path = applyPathAndIdToModel({
    dataParentModel,
    index,
    model: instanceModel,
    modelIdMap,
    parent,
    path: _path,
  });

  if (parent) {
    instanceModel.parent = parent.id;
  }

  if (dataParentModel) {
    instanceModel.dataParent = dataParentModel.id;
  }

  // Keep track of current dataParentModel
  if (instanceModel.apiType === 'object' || instanceModel.apiType === 'array') {
    dataParentModel = instanceModel;
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
      dataParentModel,
      extension,
      modelIdMap,
      modelPathMap: modelPathMap,
      models: instanceModel.items,
      onModelItemChange,
      options,
      parent: instanceModel,
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
    model: instanceModel,
    modelIdMap,
    onModelItemChange,
    options,
    customCoreModel,
    dataParentModel,
    modelPathMap,
    extension,
    index,
    parent,
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
  parent: FormalizedModel;
  models: FormalizedModel[];
  modelIdMap?: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  extension?: ExtensionInterface;
  options?: FormalizerCoreOptions;
  onModelItemChange: (props: ListenerProps) => void;
  path?: string;
  dataParentModel?: FormalizedModel;
};

const createFormalizerModels = ({
  parent,
  models,
  modelIdMap,
  extension,
  options,
  onModelItemChange,
  path,
  dataParentModel,
  modelPathMap,
}: CreateFormalizerModelsProps) => {
  const formalizedModels = models
    .map((model, index) => {
      const { model: _model } = createFormalizerModel({
        model,
        parent,
        modelIdMap,
        extension,
        options,
        path,
        onModelItemChange,
        index,
        dataParentModel,
        modelPathMap,
      });

      return _model;
    })
    .filter((f) => f !== undefined);

  return formalizedModels as FormalizedModel[];
};
