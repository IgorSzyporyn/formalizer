import { useContext } from 'react';
import { FormalizerContext } from '../../context/formalizer-context';
import { Field } from '../field/field';

type CreateChildProps = {
  id?: string;
};

export const CreateChild = ({ id }: CreateChildProps) => {
  const { formalizer } = useContext(FormalizerContext);
  const model = formalizer?.getModel(id);

  return (
    <Field id={id}>
      {({ props, Component }) => {
        return (
          <Component
            {...props}
            key={`react-create-child-${model?.id}-${model?.type}`}
            model={model}
          />
        );
      }}
    </Field>
  );
};
