import { FieldWrapper } from '../../field-wrapper/field-wrapper';
import { FormalizerComponentProps } from '../../../../types';
import { CreateChildren } from '../../../../components/create-children/create-children';

export const ObjectField = (props: FormalizerComponentProps) => {
  const children = CreateChildren(props);

  return <FieldWrapper {...props}>{children}</FieldWrapper>;
};
