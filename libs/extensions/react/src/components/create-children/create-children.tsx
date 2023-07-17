import { FormalizedModel } from '@formalizer/core';
import { CreateChild } from '../create-child/create-child';

type CreateChildrenProps = {
  model: FormalizedModel;
};

export const CreateChildren = ({ model }: CreateChildrenProps) => {
  const children = model.items?.map((item) => {
    return <CreateChild key={item.id} model={item} />;
  });

  return children;
};
