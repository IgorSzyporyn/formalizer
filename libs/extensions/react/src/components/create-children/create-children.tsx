import { Fragment } from 'react';
import { FormalizerComponentProps } from '../../types';
import { CreateChild } from '../create-child/create-child';

export const CreateChildren = (props: FormalizerComponentProps) => {
  const { model } = props;

  const children = model?.items?.map((item) => {
    return (
      <Fragment key={`${item.id}`}>
        <CreateChild id={item.id} />
      </Fragment>
    );
  });

  return children;
};
