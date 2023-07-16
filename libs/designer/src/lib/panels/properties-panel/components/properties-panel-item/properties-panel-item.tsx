import { FormalizedModel, FormalizerModelChange } from '@formalizer/core';
import { createPropertiesClientModel } from '../../utils/create-properties-client-model';
import { Formalizer, useFormalizer } from '@formalizer/react';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';
import { Card, CardContent, CardProps } from '@mui/material';

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
      <ModelCardHeader modelId={model?.id} />
      <CardContent>
        <Formalizer formalizer={formalizer} auto />
      </CardContent>
    </Card>
  );
};
