import {
  ComponentMap,
  FormalizerCore,
  FormalizerCoreParams,
} from '@formalizer/core';
import { ChangeEvent } from 'react';
import { reactExtension } from '../models/react-model';
import { FormalizerPayload, FrameworkType } from '../types';
import { getFrameworkModel } from '../utils/get-framework-model';

export type UseFormalizerProps = {
  framework?: FrameworkType | ComponentMap<unknown>;
} & FormalizerCoreParams;

export const useFormalizer = ({
  framework: _framework = 'vanilla',
  ...rest
}: UseFormalizerProps): FormalizerPayload => {
  const formalizer = new FormalizerCore({
    ...rest,
    extension: reactExtension,
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
