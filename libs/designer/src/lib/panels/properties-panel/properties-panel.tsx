import { PanelBody, PanelHeader } from '@formalizer/components';
import { FormalizedModel, FormalizerModelChange } from '@formalizer/core';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Fragment, useContext, useEffect, useState } from 'react';
import { DesignerContext } from '../../context';
import { PropertiesPanelItem } from './components/properties-panel-item/properties-panel-item';

type PropertiesPanelProps = {
  activeModelId?: string;
};

export const PropertiesPanel = ({ activeModelId }: PropertiesPanelProps) => {
  const { formalizer } = useContext(DesignerContext);
  const [items, setItems] = useState<FormalizedModel[]>([]);

  const updateItems = () => {
    const modelIdMap = formalizer?.getModelIdMap();
    const newItems: FormalizedModel[] = [];

    for (const [_, value] of Object.entries(modelIdMap || {})) {
      newItems.push(value);
    }

    setItems(newItems);
  };

  const handleModelItemChange = ({ props }: FormalizerModelChange) => {
    const model = formalizer?.getModel(activeModelId);

    if (model && props && props.model) {
      const property = props.model.name as keyof FormalizedModel;
      model[property] = props.value;
    }
  };

  useEffect(() => {
    updateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('rendering properties panel');

  return (
    <Fragment key="properties-panel">
      <PanelHeader
        title="Model Properties"
        Icon={EditNoteIcon}
        description="Edit the properties"
      />
      <PanelBody>
        {items.map((item) => {
          return item.id === activeModelId ? (
            <PropertiesPanelItem
              key={item.id}
              model={item}
              onModelChange={handleModelItemChange}
            />
          ) : null;
        })}
      </PanelBody>
    </Fragment>
  );
};
