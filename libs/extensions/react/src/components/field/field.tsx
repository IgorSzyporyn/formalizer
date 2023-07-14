import {
  CoreModelType,
  ExtraProperties,
  FormalizedModel,
} from '@formalizer/core';
import { cloneDeep } from 'lodash';
import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FormalizerContext } from '../../context/formalizer-context';
import { FieldChildProps, FormalizerComponentProps } from '../../types';

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
  const initialized = useRef(false);

  const {
    formalizer,
    framework: _framework,
    handleBlur: _handleBlur,
    handleChange: _handleChange,
  } = useContext(FormalizerContext);

  const model = formalizer?.getModel(id);
  const value = model?.value;

  const [modelType, setModelType] = useState<CoreModelType | undefined>(
    model?.type
  );

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

  if (model && modelType && _framework?.[modelType]) {
    const framework = _framework?.[modelType];
    const frameworkProperties = framework?.(model) || {};

    extraProperties = frameworkProperties.extraProperties || {};
    Component = frameworkProperties.Component;
  }

  const addListener = useCallback(() => {
    model?.addListener?.({
      property: 'type',
      id: `react-component-field-${model.id}-type`,
      callback: ({ value }) => {
        setModelType(value as CoreModelType);
      },
    });
  }, [model]);

  useEffect(() => {
    if (!initialized.current) {
      addListener();
      initialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (model?.type !== modelType) {
      setModelType(model?.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  return model && Component
    ? children?.({
        props: {
          ...cloneDeep(extraProperties),
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
