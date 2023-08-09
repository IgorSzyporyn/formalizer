import { FormHelperText, InputAdornment, TextField as MuiTextField } from '@mui/material';
import { FieldComponentProps } from '../../../../typings';
import { Field } from '../../components/field/field';

export const TextField = ({ model, overrides, ...props }: FieldComponentProps) => {
  const Icon = model.icon;

  return (
    <Field model={model}>
      {({ fullWidth }) => {
        return (
          <>
            <MuiTextField
              {...props}
              label={model.title}
              size={model.size === 'small' ? 'small' : 'medium'}
              type={model.type}
              fullWidth={overrides?.fullWidth || fullWidth}
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
            {model.hint && <FormHelperText>{model.hint}</FormHelperText>}
          </>
        );
      }}
    </Field>
  );
};
