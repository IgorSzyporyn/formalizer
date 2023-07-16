import { FormGroup as MuiFormGroup, Typography } from '@mui/material';
import { CreateChildren } from '../../../../components/create-children/create-children';
import { FieldComponentProps } from '../../../../types';
import { Fragment } from 'react';

export const FormGroup = ({ model, ...props }: FieldComponentProps) => {
  return (
    <Fragment key={`react-mui-group-form-group-${model?.id}`}>
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
        <CreateChildren model={model} {...props} />
      </MuiFormGroup>
    </Fragment>
  );
};
