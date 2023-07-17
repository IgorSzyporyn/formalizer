import {
  ComponentMap,
  ExtraProperties,
  FormalizerCore,
  FormalizerFrameworkModel,
  FormalizedModel,
  CoreModelType,
} from '@formalizer/core';
import { FrameworkType } from '../typings';
import { vanillaFrameworkModel } from '../frameworks/vanilla/vanilla-framework';
import deepmerge from 'deepmerge';
import { muiFrameworkModel } from '../frameworks/mui/mui-framework';

const _frameworkMap: Record<FrameworkType, ComponentMap<unknown>> = {
  vanilla: vanillaFrameworkModel,
  antd: vanillaFrameworkModel,
  mui: muiFrameworkModel,
};

export const getFrameworkModel = <T>(
  framework: FrameworkType | ComponentMap<T>,
  formalizer?: FormalizerCore
): Partial<FormalizerFrameworkModel> => {
  const isCustomFramework = typeof framework !== 'string';
  const frameworkModel: Partial<FormalizerFrameworkModel> = {};
  const frameworkMap = isCustomFramework ? framework : _frameworkMap[framework];

  for (const [_key, value] of Object.entries(frameworkMap)) {
    const key = _key as CoreModelType;
    frameworkModel[key] = (_model) => {
      const extraProperties: ExtraProperties = deepmerge(
        _model.extension?.extraProperties || {},
        value.properties
      );

      const mappedExtraProperties: ExtraProperties = {};

      for (const [_property, propertyValue] of Object.entries(_model)) {
        const property = _property as keyof FormalizedModel;
        const mappedKey = value.map[property];

        if (mappedKey) {
          mappedExtraProperties[mappedKey] = propertyValue;
        }
      }

      return {
        Component: value.Component,
        extraProperties: deepmerge(extraProperties, mappedExtraProperties),
      };
    };
  }

  return frameworkModel;
};
