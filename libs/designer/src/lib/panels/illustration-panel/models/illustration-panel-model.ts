import { CoreModelType } from '@formalizer/core';
import { GridIllustration } from '../fields/grid-illustration/grid-illustration';
import { IllustrationSingle } from '../components/illustration-single/illustration-single';
import { IllustrationNested } from '../components/illustration-nested/illustration-nested';

export type IllustrationModel = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
};

export const illustrationModels: Record<CoreModelType, IllustrationModel> = {
  form: {
    Component: IllustrationNested,
  },
  uiArray: {
    Component: IllustrationSingle,
  },
  array: {
    Component: IllustrationNested,
  },
  boolean: {
    Component: IllustrationSingle,
  },
  color: {
    Component: IllustrationSingle,
  },
  date: {
    Component: IllustrationSingle,
  },
  dateTime: {
    Component: IllustrationSingle,
  },
  email: {
    Component: IllustrationSingle,
  },
  grid: {
    Component: GridIllustration,
  },
  group: {
    Component: IllustrationNested,
  },
  longtext: {
    Component: IllustrationSingle,
  },
  month: {
    Component: IllustrationSingle,
  },
  number: {
    Component: IllustrationSingle,
  },
  object: {
    Component: IllustrationNested,
  },
  uiObject: {
    Component: IllustrationSingle,
  },
  password: {
    Component: IllustrationSingle,
  },
  radiogroup: {
    Component: IllustrationNested,
  },
  radioItem: {
    Component: IllustrationSingle,
  },
  root: {
    Component: IllustrationNested,
  },
  telephone: {
    Component: IllustrationSingle,
  },
  text: {
    Component: IllustrationSingle,
  },
  time: {
    Component: IllustrationSingle,
  },
  week: {
    Component: IllustrationSingle,
  },
  options: {
    Component: IllustrationSingle,
  },
  option: {
    Component: IllustrationSingle,
  },
};
