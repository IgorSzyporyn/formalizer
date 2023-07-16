import { PanelBody, PanelHeader } from '@formalizer/components';
import { FormalizedModel, FormalizerModelChange } from '@formalizer/core';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { HTMLAttributes, useCallback, useContext } from 'react';
import { DesignerContext, DesignerUiContext } from '../../context';
import { PropertiesPanelItem } from './components/properties-panel-item/properties-panel-item';

type PropertiesPanelProps = HTMLAttributes<HTMLDivElement>;

export const PropertiesPanel = ({ ...props }: PropertiesPanelProps) => {
  const { activeModelId } = useContext(DesignerUiContext);
  const { formalizer } = useContext(DesignerContext);
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
        description="Edit the properties"
      />
      <PanelBody>
        {model && (
          <PropertiesPanelItem
            model={model}
            onModelChange={handleModelChange}
          />
        )}
      </PanelBody>
    </div>
  );
};
