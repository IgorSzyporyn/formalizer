import { FormalizerComponentProps } from '../../types';
import { CreateChild } from '../create-child/create-child';

export const CreateChildren = (props: FormalizerComponentProps) => {
  const { model } = props;

  const children = model?.items?.map((item) => {
    return <CreateChild key={item.id} model={item} />;
  });

  return children;
};
