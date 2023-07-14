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
  const listener = useListener(model);

  const clientModel = createPropertiesClientModel({ model });

  useEffect(() => {
    const newPropertiesModel = createPropertiesClientModel({
      model: listener.model,
    });
  }, [listener]);

  const propertiesFormalizer = useFormalizer({
    model: clientModel,
    framework: 'mui',
    options: {
      onModelChange: ({ value }) => {
        /*
        for (const [_key, _value] of Object.entries(value || {})) {
          const key = _key as PropertyModelType;

          if (model) {
            model[key] = _value as never;
          }
        }

        // setDirty(!!propertiesFormalizer.formalizer?.getState()?.dirty);
        */
      },
    },
  });

  /*
  const handleListener = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (name: string, key: string, value: any) => {
      const id = `properties.${name}.${key}`;
      const propertiesModel = propertiesFormalizer?.formalizer?.getModel(id);

      if (propertiesModel) {
        propertiesModel.value = value;
      }

      if (propertiesModel && key === 'type') {
        propertiesFormalizer.formalizer?.updateModel(
          createPropertiesClientModel({ model })
        );
      }
    },
    [model, propertiesFormalizer]
  );

  const addListeners = useCallback(() => {
    model?.addListener?.({
      id: `properties-panel.${model.id}-*`,
      property: '*',
      callback: ({ property, value, model: _model }) => {
        handleListener(model.name || '', property, value);
      },
    });
  }, [handleListener, model]);

  const removeListeners = useCallback(() => {
    model?.removeListener?.(`properties-panel.${model.id}-*`);
  }, [model]);

  useEffect(() => {
    addListeners();

    return () => {
      removeListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
*/
  return (
    <Fragment key="properties-panel">
      <PanelHeader
        title="Model Properties"
        Icon={EditNoteIcon}
        description="Edit the properties"
      />
      <PanelBody>
        <Card>
          <ModelCardHeader modelId={model?.id} />
          <CardContent></CardContent>
        </Card>
      </PanelBody>
    </Fragment>
  );
};

/*

<Formalizer
  formalizer={propertiesFormalizer}
  formId={activeModelId}
  auto
/>
        <ModelItemPanel
          modelId={id}
          Action={
            <Fragment key="properties-panel-action">
              <Button
                key="properties-action-panel-cancel"
                onClick={onCancelItemEdit}
                startIcon={<CancelIcon />}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                key="properties-action-panel-save"
                disabled={!dirty}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Fragment>
          }
        >
          <Formalizer formalizer={propertiesFormalizer} auto />
        </ModelItemPanel>
        */
