import { Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent } from 'react';
import { FieldComponentProps } from '../../../../typings';
import { Field } from '../../components/field/field';

export const BooleanField = ({ model, ...props }: FieldComponentProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    props.onChange({
      target: { id: props.id, value: e.target.checked },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  return (
    <Field model={model}>
      {() => {
        return (
          <FormControlLabel
            control={<Checkbox {...props} checked={!!props.value} onChange={handleChange} />}
            label={model?.title}
          />
        );
      }}
    </Field>
  );
};
