import { CreateChildren } from '../../../../components/create-children/create-children';
import { FieldComponentProps } from '../../../../typings';

export const RootField = (props: FieldComponentProps) => {
  return <CreateChildren {...props} />;
};
