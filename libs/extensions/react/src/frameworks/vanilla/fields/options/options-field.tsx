import { FieldWrapper } from '../../field-wrapper/field-wrapper';
import { FormalizerComponentProps } from '../../../../types';
import * as Styled from './styled';

export const OptionsField = (props: FormalizerComponentProps) => {
  const { model } = props;

  return (
    <FieldWrapper {...props}>
      {model?.title && (
        <Styled.Label htmlFor={props.id}>{model.title}</Styled.Label>
      )}
      <Styled.Select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        $fullWidth={model?.fullWidth}
      >
        {model?.options?.map((option) => {
          return (
            <Styled.Option key={option} value={option}>
              {option}
            </Styled.Option>
          );
        })}
      </Styled.Select>
    </FieldWrapper>
  );
};
