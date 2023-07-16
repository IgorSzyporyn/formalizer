import { FormalizedModel, FormalizerModelChange } from '@formalizer/core';
import { Formalizer, useFormalizer } from '@formalizer/react';
import { Card, CardContent, CardProps } from '@mui/material';
import { createPropertiesClientModel } from '../../utils/create-properties-client-model';

type PropertiesPanelItemProps = {
  model?: FormalizedModel;
  onModelChange: ((change: FormalizerModelChange) => void) | undefined;
} & CardProps;

export const PropertiesPanelItem = ({
  model,
  onModelChange,
  ...rest
}: PropertiesPanelItemProps) => {
  const clientModel = createPropertiesClientModel({ model });

  const formalizer = useFormalizer({
    model: clientModel,
    framework: 'mui',
    onModelChange,
  });

  return (
    <Card {...rest}>
      <CardContent>
        <Formalizer formalizer={formalizer} auto />
      </CardContent>
    </Card>
  );
};
