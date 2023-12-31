import {
  FormalizedModel,
  FormalizerCore,
  FormalizerCoreState,
  FormalizerFrameworkModel,
} from '@formalizer/core';
import { ChangeEvent, ReactNode } from 'react';

export type FrameworkType = 'vanilla' | 'mui' | 'antd';

export type FormalizerPayload = {
  framework?: Partial<FormalizerFrameworkModel>;
  formalizer?: FormalizerCore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model?: Record<string, any>;
  state?: FormalizerCoreState;
  handleSubmit: (e: unknown) => void;
  handleBlur: (e: unknown) => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
};

export type FieldChildProps = {
  id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  onChange: (e: ChangeEvent<unknown>) => void;
  onBlur: (e: ChangeEvent<unknown>) => void;
};

export type FieldComponentProps = {
  model: FormalizedModel;
  overrides?: Partial<FormalizedModel>;
} & FieldChildProps;

export type FieldChildRenderProps = {
  props: FieldChildProps;
  model: FormalizedModel;
  Component: (componentProps: FieldComponentProps) => ReactNode;
};
