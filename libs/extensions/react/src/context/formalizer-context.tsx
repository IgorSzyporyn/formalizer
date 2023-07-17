import { FormalizerCore } from '@formalizer/core';
import { createContext } from 'react';
import { FormalizerPayload } from '../typings';

export const defaultContext: FormalizerContextProps = {
  framework: undefined,
  formalizer: undefined,
  model: {},
  value: undefined,
  state: {
    dirty: false,
    errors: {},
    touched: false,
    valid: false,
  },
  handleChange: () => {
    return;
  },
  handleBlur: () => {
    return;
  },
  handleSubmit: () => {
    return;
  },
};

export type FormalizerContextProps = Omit<FormalizerPayload, 'formalizer'> & {
  formalizer?: FormalizerCore;
};

export const FormalizerContext = createContext<FormalizerContextProps>({
  ...defaultContext,
});
