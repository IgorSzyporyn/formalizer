import { PanelBody, PanelHeader } from '@formalizer/components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LayersIcon from '@mui/icons-material/Layers';
import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { FormalizerContext } from '../../context/designer-context';
import { SortableTree } from './components/sortable-tree/sortable-tree';

export const LayerPanel = () => {
  const formalizer = useContext(FormalizerContext);
  const model = formalizer?.getRootModel();

  return (
    <Box>
      <PanelHeader
        Icon={LayersIcon}
        title="Model Structure"
        Action={<Button startIcon={<AddCircleIcon />}>Add</Button>}
        description="Manage your model by sorting, editing, deleting items or place it in focus for editing in the focus panel."
      />
      <PanelBody>
        <SortableTree model={model} indentationWidth={16} />
      </PanelBody>
    </Box>
  );
};
