import { CollapseButton } from '@formalizer/components';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Collapse, IconButton } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { DesignerContext } from '../../../../context';
import { ModelItemPanel } from '../../../model-item-panel/model-item-panel';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';

type IllustrationNestedProps = {
  modelId?: string;
};

export const IllustrationNested = ({ modelId }: IllustrationNestedProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapsed = () => {
    setCollapsed((state) => !state);
  };

  return (
    <Box sx={{ m: 1.5 }}>
      <ModelItemPanel
        noShadow
        bordered
        id={`illustration-nested-${modelId}`}
        modelId={modelId}
        Action={
          <Fragment key="form-illustration-action">
            <IconButton sx={{ mr: 1 }}>
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
    </Box>
  );
};
