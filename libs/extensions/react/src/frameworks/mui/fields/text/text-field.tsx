import {
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField as MuiTextField,
} from '@mui/material';
import { FieldComponentProps } from '../../../../types';

export const TextField = ({ model, ...props }: FieldComponentProps) => {
  const Icon = model?.icon;

  return (
    <FormControl fullWidth={model?.fullWidth} sx={{ mb: 2 }}>
      <MuiTextField
        {...props}
        label={model?.title}
        size={model?.size === 'small' ? 'small' : 'medium'}
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
