import { PanelBody, PanelHeader } from '@formalizer/components';
import { PropertyModelType } from '@formalizer/core';
import { Formalizer, useFormalizer, useListener } from '@formalizer/react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Card, CardContent } from '@mui/material';
import { Fragment, useCallback, useContext, useEffect } from 'react';
import { ModelCardHeader } from '../../components/model-card-header/model-card-header';
import { DesignerContext, DesignerUiContext } from '../../context';
import { createPropertiesClientModel } from './utils/create-properties-client-model';

type PropertiesPanelProps = {
  onCancelItemEdit?: () => void;
};

export const PropertiesPanel = ({ onCancelItemEdit }: PropertiesPanelProps) => {
  const { activeModelId } = useContext(DesignerUiContext);
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(activeModelId);
  const modelListener = useListener(model);

  const clientModel = createPropertiesClientModel({ model });

  const propertiesFormalizer = useFormalizer({
    model: clientModel,
    framework: 'mui',
    options: {
      onModelChange: ({ value }) => {
        for (const [_key, _value] of Object.entries(value || {})) {
          const key = _key as PropertyModelType;

          if (model) {
            model[key] = _value as never;
          }
        }

        // setDirty(!!propertiesFormalizer.formalizer?.getState()?.dirty);
      },
    },
  });

  useEffect(() => {
    const property = modelListener.property;
    const id = `${model?.name}.${property}`;
    const value = modelListener.value;

    const propertiesModel = propertiesFormalizer?.formalizer?.getModel(id);

    if (propertiesModel) {
      propertiesModel.value = value;
    }

    if (propertiesModel && property === 'type') {
      propertiesFormalizer.formalizer?.updateModel(
        createPropertiesClientModel({ model })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelListener]);

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
              formId={activeModelId}
              auto
            />
          </CardContent>
        </Card>
      </PanelBody>
    </Fragment>
  );
};
