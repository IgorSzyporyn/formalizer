import { FormalizerCoreOptions } from './formalizer-types';

export const coreModelTypes = [
  'root',
  'array',
  'boolean',
  'color',
  'date',
  'dateTime',
  'email',
  'form',
  'grid',
  'group',
  'longtext',
  'month',
  'number',
  'object',
  'options',
  'options',
  'option',
  'password',
  'radioItem',
  'radiogroup',
  'telephone',
  'text',
  'time',
  'uiArray',
  'uiObject',
  'week',
] as const;

export const apiModelTypes = [
  'none',
  'array',
  'boolean',
  'number',
  'object',
  'string',
] as const;

export const propertyModelTypes = [
  'apiType',
  'collapsible',
  'collapsed',
  'columns',
  'defaultValue',
  'description',
  'direction',
  'emptyValue',
  'fullWidth',
  'group',
  'hidden',
  'hint',
  'icon',
  'initialValue',
  'inline',
  'items',
  'layoutOnly',
  'multiple',
  'name',
  'nullable',
  'options',
  'readonly',
  'serialize',
  'serializeDelimiter',
  'size',
  'title',
  'type',
  'uiType',
  'value',
  'width',
] as const;

export const formalizedPropertyTypes = [
  'id',
  'path',
  'parentId',
  'dataParentId',
  'items',
  'extension',
  'dirty',
  'touched',
  'error',
  'addListener',
  'removeListener',
  'removeListeners',
  'toJSON',
  '__formalized__',
] as const;

export type CoreModelType = (typeof coreModelTypes)[number];
export type ApiModelType = (typeof apiModelTypes)[number];

export type FormalizedPropertyType = (typeof formalizedPropertyTypes)[number];
export type ClientPropertyType = (typeof propertyModelTypes)[number];

export type ApiModelFnProps = {
  value?: unknown;
  model: FormalizedModel;
  options?: FormalizerCoreOptions;
};

export type ApiModelInterface = Record<ApiModelType, ApiModel>;
export type CoreModelInterface = Record<CoreModelType, CoreModel>;
export type PropertyModelInterface = Record<ClientPropertyType, PropertyModel>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtraProperties = Record<string, any>;

export type Dependency = {
  id: string;
  matchProp: keyof FormalizedModel;
  targetProp: keyof FormalizedModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matchValue?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matchAnyOf?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matchAllOf?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matchNoneOf?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successValue?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  failureValue?: any;
  preventInitOnLoad?: boolean;
};

export type AddListenerFn = (listener: Listener) => void;
export type RemoveListenerFn = (id: string) => void;
export type RemoveListenersFn = (listenerIds: string[]) => void;

export type AddListenerAllFn = (callback: ListenerCallback) => void;

export type ListenerProps = {
  property: keyof FormalizedModel;
  value: unknown;
  model: FormalizedModel;
};

export type ListenerCallback = (props: ListenerProps) => void;

export type Listener = {
  id: string;
  property: string;
  callback: ListenerCallback;
};

export type ExtensionModelExtraProperties = Record<string, unknown>;

export type ExtensionModel = {
  component: string;
  extraProperties: ExtensionModelExtraProperties;
  registerExtraProperties?: (
    model: FormalizedModel
  ) => ExtensionModelExtraProperties;
};

export type Direction = 'horizontal' | 'vertical';

export type ExtensionInterface = Record<CoreModelType, ExtensionModel>;

export type ApiModelRawToValueFn = (props: ApiModelFnProps) => unknown;
export type ApiModelValueToRawFn = (props: ApiModelFnProps) => unknown;

/***********************************************************/
/*   API MODEL                                             */
/***********************************************************/
export type ApiModel = {
  rawToValue?: ApiModelRawToValueFn;
  valueToRaw?: ApiModelValueToRawFn;
  emptyValue?: unknown;
};

/***********************************************************/
/*   CORE MODEL                                            */
/***********************************************************/
export type CoreModel = {
  apiType?: ApiModelType;
  accepts?: CoreModelType[];
  preventedProperties?: ClientPropertyType[];
  defaultProperties?: ClientPropertyType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any[];
  rawToValue?: ApiModelRawToValueFn;
  valueToRaw?: ApiModelValueToRawFn;
  emptyValue?: unknown;
};

/***********************************************************/
/*   CLIENT MODEL                                          */
/***********************************************************/
export type ClientModel = {
  name: string;
  type: CoreModelType;
  apiType?: ApiModelType;
  uiType?: string;
  nullable?: boolean;
  title?: string;
  description?: string;
  hint?: string;
  size?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  items?: ClientModel[];
  defaultValue?: unknown;
  emptyValue?: unknown;
  initialValue?: unknown;
  group?: string;
  multiple?: boolean;
  layoutOnly?: boolean;
  value?: unknown;
  dependencies?: Dependency[];
  fullWidth?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any[];
  hidden?: boolean;
  width?: string;
  direction?: Direction;
  inline?: boolean;
  columns?: number;
  readonly?: boolean;
  /**
   * Will run the api valueToRaw when setting value which will
   * for instance turn [1,2,3] into '1,2,3'
   */
  serialize?: boolean;
  serializeDelimiter?: string;
  listeners?: Listener[];
};

/***********************************************************/
/*   COMBINED RUNTIME MODEL                                */
/***********************************************************/
export type FormalizedModel = {
  id?: string;
  path?: string;
  parentId?: string;
  dataParentId?: string;
  items?: FormalizedModel[];
  extension?: ExtensionModel;
  dirty?: boolean;
  touched?: boolean;
  error?: string | string[];
  addListener?: AddListenerFn;
  removeListener?: RemoveListenerFn;
  removeListeners?: RemoveListenersFn;
  toJSON?: () => ClientModel;
  __formalized__?: boolean;
} & CoreModel &
  ApiModel &
  ClientModel;

/***********************************************************/
/*   PROPERTIES MODEL                                      */
/***********************************************************/
export type PropertyModel = ClientModel & {
  inheritType?: boolean;
};

/***********************************************************/
/*   FRAMEWORK MODEL                                       */
/***********************************************************/

export type FormalizerFrameworkModel = Record<
  CoreModelType,
  (model: FormalizedModel) => FormalizerFrameworkModelProps
>;

export type FormalizerFrameworkModelProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraProperties?: ExtraProperties;
};
