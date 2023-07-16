import { PanelBody, PanelHeader } from '@formalizer/components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import LayersIcon from '@mui/icons-material/Layers';
import { Box, Button } from '@mui/material';
import { Fragment, HTMLAttributes, useContext } from 'react';
import { SortableTree } from './components/sortable-tree/sortable-tree';
import { DesignerContext } from '../../context';

type LayerPanelProps = HTMLAttributes<HTMLDivElement>;

export const LayerPanel = ({ ...props }: LayerPanelProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getRootModel();

  return (
    <div {...props}>
      <PanelHeader
        Icon={LayersIcon}
        title="Model Structure"
        Action={
          <Fragment key="layer-panel-action">
            <Button color="primary" sx={{ mr: 1 }} startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button color="success" startIcon={<AddCircleIcon />}>
              Add
            </Button>
          </Fragment>
        }
        description={
          <Fragment key="layer-panel-description">
            <Box component="span" sx={{ pb: 1 }}>
              The model as a tree sortable tree structure.
            </Box>
            <Box component="span">
              Adding new models to the model via button will place the new model
              last, and clicking edit will let you edit root
            </Box>
          </Fragment>
        }
      />
      <PanelBody>
        <SortableTree model={model} collapsible indentationWidth={16} />
      </PanelBody>
    </div>
  );
};
