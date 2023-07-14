import { FieldWrapper } from '../../../../components/field-wrapper/field-wrapper';
import { FormalizerComponentProps } from '../../../../types';
import { CreateChildren } from '../../../../components/create-children/create-children';

export const ArrayField = (props: FormalizerComponentProps) => {
  return (
    <FieldWrapper {...props}>
      <CreateChildren {...props} />
    </FieldWrapper>
  );
};
