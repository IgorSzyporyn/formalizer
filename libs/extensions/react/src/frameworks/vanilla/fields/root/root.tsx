import { FieldWrapper } from '../../../../components/field-wrapper/field-wrapper';
import { FormalizerComponentProps } from '../../../../types';
import { CreateChildren } from '../../../../components/create-children/create-children';

export const RootField = (props: FormalizerComponentProps) => {
  const children = CreateChildren(props);

  return <FieldWrapper {...props}>{children}</FieldWrapper>;
};
