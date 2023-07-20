import { PanelBody, PanelHeader } from '@formalizer/components';
import { FormalizedModel, FormalizerModelChange } from '@formalizer/core';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { HTMLAttributes, useCallback, useContext } from 'react';
import { FormalizerContext, UiContext } from '../../context/designer-context';
import { PropertiesPanelItem } from './components/properties-panel-item/properties-panel-item';

type PropertiesPanelProps = HTMLAttributes<HTMLDivElement>;

export const PropertiesPanel = (props: PropertiesPanelProps) => {
  const { activeEditModelId: activeModelId } = useContext(UiContext);
  const formalizer = useContext(FormalizerContext);
  const model = formalizer?.getModel(activeModelId);

  const handleModelChange = useCallback(
    ({ props }: FormalizerModelChange) => {
      if (props && props.model) {
        const property = props.model.name as keyof FormalizedModel;

        if (model && property) {
          model[property] = props.value;
        }
      }
    },
    [model]
  );

  return (
    <div {...props}>
      <PanelHeader
        title="Model Properties"
        Icon={EditNoteIcon}
        description="Customize properties and see real-time previews for effortless model design."
      />
      <PanelBody>
        {model && (
          <PropertiesPanelItem
            key={activeModelId}
            model={model}
            onModelChange={handleModelChange}
          />
        )}
      </PanelBody>
    </div>
  );
};
