import { FormalizedModel } from '@formalizer/core';
import { Fragment } from 'react';
import { CreateIllustration } from '../create-illustration/create-illustration';

type CreateIllustrationsProps = {
  items?: FormalizedModel[];
};

export const CreateIllustrations = ({ items }: CreateIllustrationsProps) => {
  return items?.map((item) => {
    return (
      <Fragment key={item.id}>
        <CreateIllustration model={item} />
      </Fragment>
    );
  });
};
