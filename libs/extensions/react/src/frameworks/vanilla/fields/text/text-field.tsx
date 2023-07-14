import { FormalizerComponentProps } from '../../../../types';
import * as Styled from './styled';
import { FieldWrapper } from '../../field-wrapper/field-wrapper';
import { ChangeEvent } from 'react';

export const TextField = (props: FormalizerComponentProps) => {
  const { model } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    props.onChange({
      target: {
        id: props.id,
        value: e.target.value !== '' ? e.target.value : undefined,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  return (
    <FieldWrapper {...props}>
      {model?.title && (
        <Styled.Label htmlFor={props.id}>{model?.title}</Styled.Label>
      )}
      <Styled.Input
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        onBlur={props.onBlur}
        type={model?.type}
        $fullWidth={model?.fullWidth}
      />
    </FieldWrapper>
  );
};
