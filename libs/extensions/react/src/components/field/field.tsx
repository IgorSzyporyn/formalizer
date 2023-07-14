import { ExtraProperties, FormalizedModel } from '@formalizer/core';
import { cloneDeep } from 'lodash';
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FormalizerContext } from '../../context/formalizer-context';
import { useListener } from '../../hooks/use-listener';
import { FieldChildProps, FormalizerComponentProps } from '../../types';

const toJSON = (model?: FormalizedModel) => {
  let _model: FormalizedModel | undefined = undefined;

  if (model) {
    _model = JSON.parse(JSON.stringify(model));
  }

  return _model;
};

type FieldProps = {
  id?: string;
  children?: (props: {
    props: FieldChildProps;
    model: FormalizedModel;
    Component: (props: FormalizerComponentProps) => ReactNode;
  }) => ReactNode;
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
  const [state, setState] = useState(toJSON(model));
  const listener = useListener(model);

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

  const handleStateChange = (_model?: FormalizedModel) => {
    if (_model) {
      const newState = toJSON(_model);
      setState(newState);
    }
  };

  let extraProperties: ExtraProperties = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any;

  if (model && _framework?.[model.type]) {
    const framework = _framework?.[model.type];
    const frameworkProperties = framework?.(model) || {};

    extraProperties = frameworkProperties.extraProperties || {};
    Component = frameworkProperties.Component;
  }

  useEffect(() => {
    handleStateChange(listener.model);
  }, [listener]);

  const value = model?.rawToValue?.({ model, value: state?.value, options });

  return model && Component
    ? children?.({
        props: {
          ...cloneDeep(extraProperties),
          id: state?.id || '',
          name: state?.name || '',
          value: value,
          onChange: handleChange,
          onBlur: handleBlur,
        },
        model,
        Component,
      })
    : null;
};
