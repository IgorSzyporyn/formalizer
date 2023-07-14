import { FormalizerCore } from '@formalizer/core';
import { createContext } from 'react';
import { FormalizerPayload } from '../types';

export const defaultContext: FormalizerContextProps = {
  framework: undefined,
  formalizer: undefined,
  model: {},
  value: undefined,
  state: {
    dirty: false,
    dirtyMap: {},
    errors: {},
    touched: false,
    touchedMap: {},
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
