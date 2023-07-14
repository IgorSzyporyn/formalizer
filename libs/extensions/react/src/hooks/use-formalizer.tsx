import {
  ComponentMap,
  FormalizedModel,
  FormalizerConfig,
  FormalizerCore,
} from '@formalizer/core';
import { ChangeEvent } from 'react';
import { reactExtension } from '../models/react-model';
import { FormalizerPayload, FrameworkType } from '../types';
import { getFrameworkModel } from '../utils/get-framework-model';

export const useFormalizer = ({
  model,
  options,
  framework: _framework = 'vanilla',
}: {
  model: FormalizedModel;
  framework?: FrameworkType | ComponentMap<unknown>;
} & FormalizerConfig): FormalizerPayload => {
  const formalizer = new FormalizerCore({
    model,
    extension: reactExtension,
    options: { ...options, onModelChange: options?.onModelChange },
  });

  const framework = getFrameworkModel(_framework, formalizer);

  const handleSubmit = (e: unknown) => {
    // console.log(e);
  };

  const handleBlur = (e: unknown) => {
    // console.log(e);
  };

  const handleChange = (e: ChangeEvent<unknown>) => {
    e.stopPropagation?.();

    const target = e.target as HTMLInputElement;
    const targetModel = formalizer?.getModel(target.id);
    const value = target.value;

    if (targetModel) {
      targetModel.value = targetModel.valueToRaw?.({
        model: targetModel,
        value: value,
      });
    }
  };

  return {
    formalizer: formalizer,
    framework: framework,
    handleSubmit,
    handleBlur,
    handleChange,
  };
};
