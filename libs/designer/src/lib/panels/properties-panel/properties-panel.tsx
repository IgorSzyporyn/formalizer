import { PanelBody, PanelHeader } from '@formalizer/components';
import { ClientModel, FormalizedModel } from '@formalizer/core';
import { Formalizer, useFormalizer } from '@formalizer/react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Card, CardContent } from '@mui/material';
import { Fragment, useContext } from 'react';
import { ModelCardHeader } from '../../components/model-card-header/model-card-header';
import { DesignerContext } from '../../context';
import { createPropertiesClientModel } from './utils/create-properties-client-model';

type PropertiesPanelProps = {
  model?: FormalizedModel;
};

export const PropertiesPanel = ({ model }: PropertiesPanelProps) => {
  const { formalizer } = useContext(DesignerContext);
  const clientModel = createPropertiesClientModel({ model });

  const propertiesFormalizer = useFormalizer({
    model: clientModel,
    framework: 'mui',
    onModelChange: ({ value }) => {
      formalizer?.updateModel({
        id: model?.id,
        properties: value as ClientModel,
      });

      // setDirty(!!propertiesFormalizer.formalizer?.getState()?.dirty);
    },
  });

  return (
    <Fragment key={`properties-panel-${model?.id}`}>
      <PanelHeader
        title="Model Properties"
        Icon={EditNoteIcon}
        description="Edit the properties"
      />
      <PanelBody>
        <Card>
          <ModelCardHeader modelId={model?.id} />
          <CardContent>
            <Formalizer
              formalizer={propertiesFormalizer}
              formId={model?.id}
              auto
            />
          </CardContent>
        </Card>
      </PanelBody>
    </Fragment>
  );
};
