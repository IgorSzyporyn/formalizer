import { Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent } from 'react';
import { FormalizerComponentProps } from '../../../../types';

export const BooleanField = (props: FormalizerComponentProps) => {
  const { model } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    props.onChange({
      target: { id: props.id, value: e.target.checked },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          id={props.id}
          name={props.name}
          checked={!!props.value}
          onChange={handleChange}
          onBlur={props.onBlur}
        />
      }
      label={model?.title}
    />
  );
};
