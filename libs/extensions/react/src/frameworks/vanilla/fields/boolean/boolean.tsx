import { FormalizerComponentProps } from '../../../../types';
import * as Styled from './styled';
import { FieldWrapper } from '../../../../components/field-wrapper/field-wrapper';
import { ChangeEvent } from 'react';

export const BooleanField = (props: FormalizerComponentProps) => {
  const { model } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    props.onChange({
      target: { id: props.id, value: e.target.checked },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  let fieldProps = { ...props };

  if (model) {
    fieldProps = {
      ...fieldProps,
      model: { ...model, inline: model?.inline !== false },
    };
  }

  return (
    <FieldWrapper {...fieldProps}>
      {model?.title && (
        <Styled.Label htmlFor={props.id}>{model?.title}</Styled.Label>
      )}
      <Styled.Input
        id={props.id}
        name={props.name}
        checked={!!props.value}
        onChange={handleChange}
        onBlur={props.onBlur}
        type="checkbox"
        $fullWidth={model?.fullWidth}
      />
    </FieldWrapper>
  );
};
