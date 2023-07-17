import { Box } from '@mui/material';
import { CreateChildren } from '../../../../components/create-children/create-children';
import { FieldComponentProps } from '../../../../typings';
import { CollapsibleField } from '../../components/collapsible-field/collapsible-field';

export const FormField = ({ model }: FieldComponentProps) => {
  return (
    <CollapsibleField model={model} size="large">
      <Box sx={{ mt: 1, mb: 1 }}>
        <CreateChildren model={model} />
      </Box>
    </CollapsibleField>
  );
};
