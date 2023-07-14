import { ComponentMap } from '@formalizer/core';
import { ArrayField } from './fields/array/array-field';
import { TextField } from './fields/text/text-field';
import { ObjectField } from './fields/object/object-field';
import { RootField } from './fields/root/root';
import { BooleanField } from './fields/boolean/boolean';
import { OptionsField } from './fields/options/options-field';
import { GroupField } from './fields/group/group';

export const muiFrameworkModel: ComponentMap<unknown> = {
  array: {
    Component: ArrayField,
    properties: {},
    map: {},
  },
  uiArray: {
    Component: ArrayField,
    properties: {},
    map: {},
  },
  boolean: {
    Component: BooleanField,
    properties: { type: 'checkbox' },
    map: { title: 'label' },
  },
  color: {
    Component: TextField,
    properties: { type: 'color' },
    map: {},
  },
  date: {
    Component: TextField,
    properties: { type: 'date' },
    map: {},
  },
  dateTime: {
    Component: TextField,
    properties: { type: 'datetime-local' },
    map: {},
  },
  email: {
    Component: TextField,
    properties: { type: 'mail' },
    map: {},
  },
  grid: {
    Component: ArrayField,
    properties: {},
    map: {},
  },
  group: {
    Component: GroupField,
    properties: {},
    map: {},
  },
  longtext: {
    Component: TextField,
    properties: {},
    map: {},
  },
  month: {
    Component: TextField,
    properties: { type: 'month' },
    map: {},
  },
  number: {
    Component: TextField,
    properties: { type: 'number' },
    map: {},
  },
  object: {
    Component: ObjectField,
    properties: {},
    map: {},
  },
  form: {
    Component: ObjectField,
    properties: {},
    map: {},
  },
  uiObject: {
    Component: ObjectField,
    properties: {},
    map: {},
  },
  password: {
    Component: TextField,
    properties: { type: 'password' },
    map: {},
  },
  radiogroup: {
    Component: ArrayField,
    properties: {},
    map: {},
  },
  radioItem: {
    Component: TextField,
    properties: { type: 'radio' },
    map: {},
  },
  root: {
    Component: RootField,
    properties: {},
    map: {},
  },
  telephone: {
    Component: TextField,
    properties: { type: 'tel' },
    map: {},
  },
  text: {
    Component: TextField,
    properties: {},
    map: {},
  },
  time: {
    Component: TextField,
    properties: { type: 'time' },
    map: {},
  },
  week: {
    Component: TextField,
    properties: { type: 'week' },
    map: {},
  },
  options: {
    Component: OptionsField,
    properties: { multiple: true },
    map: {},
  },
  option: {
    Component: OptionsField,
    properties: {},
    map: {},
  },
};
