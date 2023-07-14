import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FormalizerComponentProps } from '../../../../types';

export const OptionsField = (props: FormalizerComponentProps) => {
  const { model } = props;

  const handleChange = (e: SelectChangeEvent<string>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props.onChange?.({ ...e, target: { ...e.target, id: model?.id } } as any);
  };

  const Icon = model?.icon;

  return (
    <FormControl fullWidth={model?.fullWidth} sx={{ mb: 2 }}>
      {model?.title && (
        <InputLabel id={`${model?.id}-label`}>{model.title}</InputLabel>
      )}
      <Select
        size={model?.size === 'small' ? 'small' : 'medium'}
        labelId={`${model?.id}-label`}
        id={props.id}
        name={props.name}
        value={props.value}
        label={model?.title}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={handleChange}
        onBlur={props.onBlur}
        startAdornment={
          Icon ? (
            <InputAdornment position="start">
              <Icon style={{ fontSize: 18 }} />
            </InputAdornment>
          ) : undefined
        }
      >
        {model?.options?.map((option) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
      {model?.hint && <FormHelperText>{model.hint}</FormHelperText>}
    </FormControl>
  );
};
