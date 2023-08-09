import { ExtraProperties } from '@formalizer/core';
import { ChangeEvent, ReactNode, useCallback, useContext } from 'react';
import { FormalizerContext } from '../../context/formalizer-context';
import { useListener } from '../../hooks/use-listener';
import { FieldChildRenderProps } from '../../typings';

type FieldProps = {
  id?: string;
  children?: (props: FieldChildRenderProps) => ReactNode;
  onChange?: (e: ChangeEvent<unknown>) => void;
  onBlur?: (e: ChangeEvent<unknown>) => void;
};

export const Field = ({ id, children, onChange, onBlur }: FieldProps) => {
  const {
    formalizer,
    framework: _framework,
    handleBlur: _handleBlur,
    handleChange: _handleChange,
  } = useContext(FormalizerContext);

  const options = formalizer?.getOptions();
  const model = formalizer?.getModel(id);

  useListener({ model, id: 'react-field' });

  const handleBlur = useCallback(
    (e: ChangeEvent<unknown>) => {
      _handleBlur(e);
      onBlur?.(e);
    },
    [_handleBlur, onBlur]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<unknown>) => {
      _handleChange(e);
      onChange?.(e);
    },
    [_handleChange, onChange]
  );

  let extraProperties: ExtraProperties = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any;

  if (model && _framework?.[model.type]) {
    const framework = _framework?.[model.type];
    const frameworkProperties = framework?.(model) || {};

    extraProperties = frameworkProperties.extraProperties || {};
    Component = frameworkProperties.Component;
  }

  const value = model?.rawToValue?.({ model, value: model?.value, options });

  return model && Component
    ? children?.({
        props: {
          ...extraProperties,
          id: model?.id || '',
          name: model?.name || '',
          value: value,
          onChange: handleChange,
          onBlur: handleBlur,
        },
        model,
        Component,
      })
    : null;
};
