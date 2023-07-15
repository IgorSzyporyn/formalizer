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
  'collapsed',
  'columns',
  'defaultValue',
  'description',
  'emptyValue',
  'fullWidth',
  'group',
  'hidden',
  'hint',
  'icon',
  'inline',
  'items',
  'name',
  'nullable',
  'layoutOnly',
  'options',
  'width',
  'direction',
  'initialValue',
  'readonly',
  'serialize',
  'serializeDelimiter',
  'size',
  'title',
  'type',
  'uiType',
  'value',
  'multiple',
] as const;

export const formalizedPropertyTypes = [
  'id',
  'path',
  'parent',
  'dataParent',
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

export type ApiValueType =
  | string
  | number
  | boolean
  | Date
  | null
  | Record<string, unknown>;

export type ApiValueTypeArray = (
  | string
  | number
  | boolean
  | Date
  | null
  | Record<string, unknown>
)[];

export type ApiValue = ApiValueType | ApiValueTypeArray | undefined;

export type ApiModelFnProps = {
  value?: ApiValueType | ApiValueTypeArray;
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
  property: ClientPropertyType | FormalizedPropertyType;
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

export type ApiModelRawToValueFn = (props: ApiModelFnProps) => ApiValue;
export type ApiModelValueToRawFn = (props: ApiModelFnProps) => ApiValue;

/***********************************************************/
/*   API MODEL                                             */
/***********************************************************/
export type ApiModel = {
  rawToValue?: ApiModelRawToValueFn;
  valueToRaw?: ApiModelValueToRawFn;
  emptyValue?: ApiValueType | ApiValueTypeArray;
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
  emptyValue?: ApiValueType | ApiValueTypeArray;
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
  collapsed?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  items?: ClientModel[];
  defaultValue?: ApiValue;
  emptyValue?: ApiValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue?: any;
  group?: string;
  multiple?: boolean;
  layoutOnly?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
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
  parent?: string;
  dataParent?: string;
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
