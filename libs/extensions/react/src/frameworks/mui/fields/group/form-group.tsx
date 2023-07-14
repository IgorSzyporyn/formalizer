import { FormGroup as MuiFormGroup, Typography } from '@mui/material';
import { CreateChildren } from '../../../../components/create-children/create-children';
import { FormalizerComponentProps } from '../../../../types';

export const FormGroup = (props: FormalizerComponentProps) => {
  const { model } = props;

  return (
    <>
      {model?.description && (
        <Typography variant="body1" sx={{ mb: 1 }}>
          {model.description}
        </Typography>
      )}
      {model?.hint && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          {model.hint}
        </Typography>
      )}
      <MuiFormGroup sx={{ pb: 2, pt: 1 }}>
        <CreateChildren {...props} />
      </MuiFormGroup>
    </>
  );
};
