import {
  ApiModelType,
  CoreModelType,
  PropertyModelInterface,
} from '../typings/model-types';

export const propertiesModel: PropertyModelInterface = {
  name: {
    type: 'text',
    name: 'name',
    title: 'Name',
    defaultValue: '',
    hint: 'The model field identifier',
    readonly: false,
  },
  type: {
    type: 'option',
    name: 'type',
    title: 'Type',
    description: 'The name of the field',
    defaultValue: 'text',
    readonly: false,
    options: [
      'array',
      'boolean',
      'color',
      'date',
      'dateTime',
      'email',
      'grid',
      'group',
      'longtext',
      'month',
      'number',
      'object',
      'password',
      'radiogroup',
      'radioItem',
      'root',
      'telephone',
      'text',
      'form',
      'options',
      'time',
      'week',
    ] as CoreModelType[],
  },
  apiType: {
    type: 'option',
    name: 'apiType',
    title: 'API Type',
    description: 'The data value type of the field',
    defaultValue: 'string',
    readonly: false,
    options: [
      'none',
      'array',
      'boolean',
      'number',
      'object',
      'string',
    ] as ApiModelType[],
  },
  title: {
    type: 'text',
    name: 'text',
    title: 'Title',
    defaultValue: '',
    description: 'The title of the model',
    readonly: false,
  },
  columns: {
    type: 'number',
    name: 'columns',
    title: 'Columns',
    defaultValue: [],
    description: 'If columns make sense',
    readonly: false,
  },
  description: {
    type: 'longtext',
    name: 'description',
    title: 'Description',
    defaultValue: '',
    description: 'Field description',
    readonly: false,
  },
  hint: {
    type: 'text',
    name: 'hint',
    title: 'Hint',
    defaultValue: '',
    description: 'A possible hint for the field',
    readonly: false,
  },
  group: {
    type: 'text',
    name: 'group',
    title: 'Group',
    defaultValue: '',
    description: 'The group of the field',
    readonly: false,
  },
  uiType: {
    type: 'text',
    name: 'uiType',
    title: 'UI Type',
    defaultValue: '',
    description: 'Overriding UI Type',
    readonly: false,
  },
  icon: {
    type: 'text',
    name: 'icon',
    title: 'Icon',
    defaultValue: '',
    description: 'Icon',
    readonly: false,
  },
  size: {
    type: 'text',
    name: 'size',
    title: 'Size',
    defaultValue: '',
    description: 'Size',
    readonly: false,
  },
  hidden: {
    type: 'option',
    apiType: 'boolean',
    name: 'hidden',
    title: 'Hidden',
    defaultValue: false,
    description: 'Hides the model entry',
    readonly: false,
    options: [true, false],
  },
  collapsed: {
    type: 'option',
    apiType: 'boolean',
    name: 'collapsed',
    title: 'Collapsed',
    defaultValue: false,
    description: 'Hides the model items',
    readonly: false,
    options: [true, false],
  },
  fullWidth: {
    type: 'option',
    apiType: 'boolean',
    name: 'fullWidth',
    title: 'Full Width',
    defaultValue: false,
    description: 'Does field take up full width',
    readonly: false,
    options: [true, false],
  },
  inline: {
    type: 'option',
    apiType: 'boolean',
    name: 'inline',
    title: 'Inline',
    defaultValue: false,
    description: 'Is field inline',
    readonly: false,
    options: [true, false],
  },
  nullable: {
    type: 'option',
    apiType: 'boolean',
    name: 'nullable',
    title: 'Nullable',
    defaultValue: false,
    description: 'Enable nullability on data',
    readonly: false,
    options: [true, false],
  },
  layoutOnly: {
    type: 'options',
    apiType: 'boolean',
    name: 'layoutOnly',
    title: 'Layout Only',
    defaultValue: false,
    description: 'Only use as layout for children',
    readonly: false,
    options: [true, false],
  },
  multiple: {
    type: 'option',
    apiType: 'boolean',
    name: 'multiple',
    title: 'Allow multiple',
    defaultValue: false,
    description: 'Allow multiple values',
    readonly: false,
    options: [true, false],
  },
  readonly: {
    type: 'option',
    apiType: 'boolean',
    name: 'readonly',
    title: 'Readonly',
    defaultValue: false,
    description: 'Is field readonly',
    readonly: false,
    options: [true, false],
  },
  serialize: {
    type: 'option',
    apiType: 'boolean',
    name: 'serialize',
    title: 'Serialize Value',
    defaultValue: false,
    description: 'Save field data serialized',
    readonly: false,
    options: [true, false],
  },
  serializeDelimiter: {
    type: 'text',
    name: 'serializeDelimiter',
    title: 'Serialize Delimiter',
    defaultValue: ',',
    description: 'The character to delimit serialized data via',
    readonly: false,
  },
  defaultValue: {
    type: 'text',
    inheritType: true,
    name: 'defaultValue',
    title: 'Default Value',
    description: 'Sets the default value',
    readonly: false,
  },
  emptyValue: {
    type: 'text',
    inheritType: true,
    name: 'emptyValue',
    title: 'Empty Value',
    description: 'Sets the empty value',
    readonly: false,
  },
  value: {
    type: 'text',
    inheritType: true,
    name: 'value',
    title: 'Value',
    description: 'Sets the initial value',
    readonly: false,
  },
  items: {
    type: 'array',
    name: 'items',
    title: 'Items',
    defaultValue: [],
    description: 'Child models',
    readonly: true,
  },
  options: {
    type: 'array',
    name: 'options',
    title: 'Options',
    defaultValue: [],
    description: 'If options make sense',
    readonly: false,
  },
  width: {
    type: 'text',
    name: 'width',
    title: 'Width',
    defaultValue: '',
    description: 'Width of field in number (px) or %',
    readonly: false,
  },
  direction: {
    type: 'option',
    name: 'direction',
    title: 'Direction',
    defaultValue: 'vertical',
    description: 'Are children distributed horizontally or vertically',
    options: ['vertical', 'horizontal'],
    readonly: false,
  },
};
