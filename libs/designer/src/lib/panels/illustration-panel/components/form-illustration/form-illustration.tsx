import { CollapseButton } from '@formalizer/components';
import DataObjectIcon from '@mui/icons-material/DataObject';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button, Collapse, IconButton } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { DesignerContext } from '../../../../designer-context';
import { ModelItemPanel } from '../../../../components/model-item-panel/model-item-panel';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';

type FormIllustrationProps = {
  modelId?: string;
};

export const FormIllustration = ({ modelId }: FormIllustrationProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => {
    setCollapsed((state) => !state);
  };

  return (
    <ModelItemPanel
      bordered
      elevation={4}
      id={`illustration-form-${modelId}`}
      modelId={modelId}
      Optional={
        <Fragment key="illustration-form-optional">
          <Box sx={{ p: 1 }} />
        </Fragment>
      }
      Action={
        <Fragment key="form-illustration-action">
          <Button sx={{ mr: 1 }} startIcon={<DataObjectIcon />}>
            Show Data
          </Button>
          <IconButton>
            <EditNoteIcon />
          </IconButton>
          <CollapseButton
            onCollapseToggle={handleCollapsed}
            collapsed={collapsed}
          />
        </Fragment>
      }
    >
      <Collapse in={!collapsed}>
        <CreateIllustrations items={model?.items} />
      </Collapse>
    </ModelItemPanel>
  );
};
