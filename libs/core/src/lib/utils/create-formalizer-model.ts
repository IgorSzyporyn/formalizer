import deepmerge from 'deepmerge';
import { createModelObserve } from '../observable/create-model-observe';
import {
  FormalizerModelIdMap,
  FormalizerModelPathMap,
  FormalizerOptions,
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

export type CreateFormalizerModelResult = {
  model?: FormalizedModel;
  modelIdMap?: FormalizerModelIdMap;
  modelPathMap?: FormalizerModelPathMap;
};

type CreateFormalizerModelProps = {
  dataParentModel?: FormalizedModel;
  extension?: ExtensionInterface;
  index?: number;
  model: ClientModel;
  modelIdMap?: FormalizerModelIdMap;
  onModelItemChange: (props: ListenerProps) => void;
  options?: FormalizerOptions;
  parent?: FormalizedModel;
  path?: string;
  customCoreModel?: CoreModelInterface;
  modelPathMap?: FormalizerModelPathMap;
};

export const createFormalizerModel = ({
  customCoreModel,
  dataParentModel,
  extension,
  index,
  model: _model,
  modelIdMap = {},
  onModelItemChange,
  options,
  parent,
  path: _path,
  modelPathMap = {},
}: CreateFormalizerModelProps): CreateFormalizerModelResult => {
  // For root we have to ensure type is "root"
  if (!parent) {
    _model.type = 'root';
  }

  // Bail early scenarios as we touch directly into modelIdMap object

  // If trying to create a type that does not exist
  if (!coreModelTypes.includes(_model.type)) {
    console.warn(
      `The model: "${_model.name}" has an invalid type: "${_model.type}"`
    );
  }

  // If parent exists and type is not accepted - bail and warn
  if (parent && (!parent.accepts || !parent?.accepts?.includes(_model.type))) {
    console.warn(
      `The model: "${parent.id}" does not accept the child: "${_model.name}" with the type "${_model.type}"`
    );
    return { model: undefined, modelIdMap };
  }

  // Extend the core model on to the client model to start the
  // creation of the formalizer model
  const instanceModel = extendClientModel(_model, customCoreModel);

  const path = applyPathAndIdToModel({
    model: instanceModel,
    path: _path,
    parent,
    modelIdMap,
    index,
    dataParentModel,
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
      parent: instanceModel,
      models: instanceModel.items,
      modelIdMap,
      extension,
      options,
      path,
      onModelItemChange,
      dataParentModel,
      modelPathMap: modelPathMap,
    });
  }

  // Ensure value is set properly for data parent type models
  const modelValue = getModelValue({ model: instanceModel });
  instanceModel.value = modelValue;

  // Create the observable model that will enable listeners on each model
  const observableModel = createModelObserve(
    instanceModel,
    modelIdMap,
    onModelItemChange,
    options
  );

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
  modelIdMap?: FormalizerModelIdMap;
  modelPathMap?: FormalizerModelPathMap;
  extension?: ExtensionInterface;
  options?: FormalizerOptions;
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
