import { FormalizedModel, FormalizerModelChange } from '@formalizer/core';
import { Formalizer, useFormalizer } from '@formalizer/react';
import { Box } from '@mui/material';
import { createPropertiesClientModel } from '../../utils/create-properties-client-model';

type PropertiesPanelItemProps = {
  model?: FormalizedModel;
  onModelChange: ((change: FormalizerModelChange) => void) | undefined;
};

export const PropertiesPanelItem = ({
  model,
  onModelChange,
}: PropertiesPanelItemProps) => {
  const clientModel = createPropertiesClientModel({ model });

  const formalizer = useFormalizer({
    model: clientModel,
    framework: 'mui',
    onModelChange,
  });

  return (
    <Box>
      <Formalizer formalizer={formalizer} auto />
    </Box>
  );
};
