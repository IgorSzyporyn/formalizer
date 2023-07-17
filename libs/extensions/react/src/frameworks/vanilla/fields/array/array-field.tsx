import { FieldWrapper } from '../../field-wrapper/field-wrapper';
import { FieldComponentProps } from '../../../../typings';
import { CreateChildren } from '../../../../components/create-children/create-children';

export const ArrayField = (props: FieldComponentProps) => {
  return (
    <FieldWrapper {...props}>
      <CreateChildren {...props} />
    </FieldWrapper>
  );
};
