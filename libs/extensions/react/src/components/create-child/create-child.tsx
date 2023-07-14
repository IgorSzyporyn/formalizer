import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FormalizerContext } from '../../context/formalizer-context';
import { Field } from '../field/field';
import { CoreModelType } from '@formalizer/core';

type CreateChildProps = {
  id?: string;
};

export const CreateChild = ({ id }: CreateChildProps) => {
  const { formalizer } = useContext(FormalizerContext);
  const model = formalizer?.getModel(id);

  const initialized = useRef(false);
  const [modelType, setModelType] = useState<CoreModelType | undefined>(
    model?.type
  );

  const addListener = useCallback(() => {
    model?.addListener?.({
      id: `react-create-children.${model.id}-*`,
      property: '*',
      callback: ({ model: _model, property }) => {
        if (property === 'type') {
          setModelType(_model.type);
        }
      },
    });
  }, [model]);

  useEffect(() => {
    if (model && !initialized.current) {
      addListener();
      initialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  return (
    <Field id={id}>
      {({ props, Component }) => {
        return (
          <Component
            key={`react-create-child-${model?.id}-${modelType}`}
            {...props}
            model={model}
          />
        );
      }}
    </Field>
  );
};
