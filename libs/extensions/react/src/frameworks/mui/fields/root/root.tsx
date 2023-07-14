import { CreateChildren } from '../../../../components/create-children/create-children';
import { FormalizerComponentProps } from '../../../../types';

export const RootField = (props: FormalizerComponentProps) => {
  return <CreateChildren {...props} />;
};
