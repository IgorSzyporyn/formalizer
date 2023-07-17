import {
  ComponentMap,
  FormalizerCore,
  FormalizerCoreParams,
} from '@formalizer/core';
import { ChangeEvent, useRef } from 'react';
import { reactExtension } from '../models/react-model';
import { FormalizerPayload, FrameworkType } from '../typings';
import { getFrameworkModel } from '../utils/get-framework-model';

export type UseFormalizerProps = {
  framework?: FrameworkType | ComponentMap<unknown>;
  formalizer?: FormalizerCore;
} & FormalizerCoreParams;

export const useFormalizer = ({
  framework: _framework = 'vanilla',
  formalizer: _formalizer,
  ...rest
}: UseFormalizerProps): FormalizerPayload => {
  const formalizer = useRef(
    _formalizer ||
      new FormalizerCore({
        ...rest,
        extension: reactExtension,
      })
  );

  const framework = getFrameworkModel(_framework, formalizer.current);

  const handleSubmit = (e: unknown) => {
    // console.log(e);
  };

  const handleBlur = (e: unknown) => {
    // console.log(e);
  };

  const handleChange = (e: ChangeEvent<unknown>) => {
    e.stopPropagation?.();

    const target = e.target as HTMLInputElement;
    const targetModel = formalizer.current?.getModel(target.id);
    const value = target.value;

    if (targetModel) {
      targetModel.value = targetModel.valueToRaw?.({
        model: targetModel,
        value: value,
      });
    }
  };

  return {
    formalizer: formalizer.current,
    framework: framework,
    handleSubmit,
    handleBlur,
    handleChange,
  };
};
