import { PanelBody, PanelHeader } from '@formalizer/components';
import { FormalizedModel } from '@formalizer/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import LayersIcon from '@mui/icons-material/Layers';
import { Box, Button } from '@mui/material';
import { Fragment } from 'react';
import { SortableTree } from './components/sortable-tree/sortable-tree';

type LayerPanelProps = {
  model?: FormalizedModel;
};

export const LayerPanel = ({ model }: LayerPanelProps) => {
  return (
    <Fragment key="layer-panel">
      <PanelHeader
        Icon={LayersIcon}
        title="Model Structure"
        Action={
          <Fragment key="layer-panel-action">
            <Button
              key="layer-panel-edit"
              color="primary"
              sx={{ mr: 1 }}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              key="layer-panel-add"
              color="success"
              startIcon={<AddCircleIcon />}
            >
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
        {model && (
          <SortableTree collapsible model={model} indentationWidth={16} />
        )}
      </PanelBody>
    </Fragment>
  );
};
