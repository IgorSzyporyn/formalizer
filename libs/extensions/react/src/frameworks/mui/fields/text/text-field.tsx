import {
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField as MuiTextField,
} from '@mui/material';
import { FormalizerComponentProps } from '../../../../types';

export const TextField = (props: FormalizerComponentProps) => {
  const { model } = props;

  const Icon = model?.icon;

  return (
    <FormControl fullWidth={model?.fullWidth} sx={{ mb: 2 }}>
      <MuiTextField
        label={model?.title}
        size={model?.size === 'small' ? 'small' : 'medium'}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type={model?.type}
        fullWidth={model?.fullWidth}
        InputProps={
          Icon
            ? {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon style={{ fontSize: 18 }} />
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
      {model?.hint && <FormHelperText>{model.hint}</FormHelperText>}
    </FormControl>
  );
};
