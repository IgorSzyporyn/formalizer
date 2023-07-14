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

    const _target = e.target as unknown;
    const target = _target as FormalizedModel;

    const targetModel = formalizer?.getModel(target.id);

    if (targetModel) {
      targetModel.value = target.value;
    }
  };

  window.B = formalizer;

  return {
    formalizer: formalizer,
    framework: framework,
    handleSubmit,
    handleBlur,
    handleChange,
  };
};
