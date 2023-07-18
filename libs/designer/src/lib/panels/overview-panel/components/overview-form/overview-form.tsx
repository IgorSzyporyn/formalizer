import { Panel } from '@formalizer/components';
import { FormalizedModel } from '@formalizer/core';
import { useListener } from '@formalizer/react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Typography } from '@mui/material';
import * as Styled from './styled';
import { useContext } from 'react';
import {
  DesignerContext,
  DesignerUiContext,
} from '../../../../designer-context';
import { CanvasTab, UtilityTab } from '../../../../typings/designer-types';

const ratio = 1.41;
const width = 300;
const height = width * ratio;

type OverviewFormProps = {
  model: FormalizedModel;
};

export const OverviewForm = ({ model }: OverviewFormProps) => {
  const { formalizer } = useContext(DesignerContext);
  const { updateUiContext } = useContext(DesignerUiContext);

  const handleExampleClick = () => {
    updateUiContext({
      activeModelId: model.id,
      activeCanvasTab: CanvasTab.Example,
    });
  };

  const handleEditClick = () => {
    updateUiContext({
      activeModelId: model.id,
      activeUtilityTab: UtilityTab.Properties,
    });
  };

  const map = formalizer?.getModelIdMap();
  const groups = Object.keys(map || {}).map((_key: string) => {
    const item = map?.[_key];
    const allow = item?.apiType === 'object';

    return allow ? item : null;
  });

  useListener(model);

  return (
    <Panel elevation={6} sx={{ m: 2, p: 2 }}>
      <Box style={{ width, height }}>
        <Styled.Header>
          <Styled.Action>
            <IconButton size="small" onClick={handleExampleClick}>
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton size="small" onClick={handleEditClick}>
              <EditNoteIcon />
            </IconButton>
          </Styled.Action>
        </Styled.Header>
        <Styled.Content>
          <Styled.Info sx={{ mt: 5, mb: 5 }}>
            <Typography variant="h6">{model.title || model.name}</Typography>
          </Styled.Info>
        </Styled.Content>
      </Box>
    </Panel>
  );
};
