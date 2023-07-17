import { FieldWrapper } from '../../field-wrapper/field-wrapper';
import { FieldComponentProps } from '../../../../typings';
import { CreateChildren } from '../../../../components/create-children/create-children';

export const RootField = (props: FieldComponentProps) => {
  const children = CreateChildren(props);

  return <FieldWrapper {...props}>{children}</FieldWrapper>;
};
