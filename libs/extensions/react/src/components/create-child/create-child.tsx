import { FormalizedModel } from '@formalizer/core';
import { Field } from '../field/field';

type CreateChildProps = {
  model?: FormalizedModel;
};

export const CreateChild = ({ model }: CreateChildProps) => {
  return (
    <Field id={model?.id}>
      {({ props, Component }) => {
        return (
          <Component
            {...props}
            // key={`react-create-child-${model?.id}-${model?.type}`}
            model={model}
          />
        );
      }}
    </Field>
  );
};
