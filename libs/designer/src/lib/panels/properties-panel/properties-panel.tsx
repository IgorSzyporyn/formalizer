import { PanelBody, PanelHeader } from '@formalizer/components';
import { FormalizedModel, FormalizerModelChange } from '@formalizer/core';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useCallback, useContext } from 'react';
import { FormalizerContext, UiContext } from '../../context/designer-context';
import { PropertiesPanelItem } from './components/properties-panel-item/properties-panel-item';

export const PropertiesPanel = () => {
  const { activeEditModelId } = useContext(UiContext);
  const formalizer = useContext(FormalizerContext);
  const model = formalizer?.getModel(activeEditModelId);

  const handleModelChange = useCallback(
    ({ props }: FormalizerModelChange) => {
      if (props && props.model) {
        const formModel = formalizer?.getModel(model?.id);

        if (formModel) {
          const property = props.model.name as keyof FormalizedModel;

          if (formModel && property) {
            formModel[property] = props.value;
          }
        }
      }
    },
    [formalizer, model]
  );

  return (
    <div key={activeEditModelId}>
      <PanelHeader
        title="Model Properties"
        Icon={EditNoteIcon}
        description="Customize properties and see real-time previews for effortless model design."
      />
      <PanelBody>
        {model && <PropertiesPanelItem model={model} onModelChange={handleModelChange} />}
      </PanelBody>
    </div>
  );
};
