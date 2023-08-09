import { FormalizedModel } from '@formalizer/core';
import { CreateChild } from '../create-child/create-child';

type CreateChildrenProps = {
  model: FormalizedModel;
  overrides?: Partial<FormalizedModel>;
};

export const CreateChildren = ({ model, overrides }: CreateChildrenProps) => {
  const children = model.items?.map((item) => {
    return <CreateChild key={item.id} model={item} overrides={overrides} />;
  });

  return children;
};
