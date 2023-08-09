import { FormalizedModel } from '@formalizer/core';
import { Field } from '../field/field';

type CreateChildProps = {
  model: FormalizedModel;
  overrides?: Partial<FormalizedModel>;
};

export const CreateChild = ({ model, overrides }: CreateChildProps) => {
  return (
    <Field id={model?.id}>
      {({ props, Component }) => {
        return <Component {...props} model={model} overrides={overrides} />;
      }}
    </Field>
  );
};
