import { useTheme } from '@emotion/react';
import { Panel } from '@formalizer/components';
import { FormalizedModel } from '@formalizer/core';
import { useListener } from '@formalizer/react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Typography } from '@mui/material';
import { useContext } from 'react';
import { FormalizerContext, UiContext } from '../../../../context/designer-context';
import { CanvasTab, UtilityTab } from '../../../../typings/designer-types';
import * as Styled from './styled';

type OverviewFormProps = {
  model: FormalizedModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any;
  width: number;
  height: number;
};

export const OverviewForm = ({ model, handleProps, width, height }: OverviewFormProps) => {
  const { updateUi, activeExampleModelId } = useContext(UiContext);
  const formalizer = useContext(FormalizerContext);
  const { palette } = useTheme();

  const handleExampleClick = () => {
    updateUi({
      activeExampleModelId: model.id,
      activeCanvasTab: CanvasTab.Example,
    });
  };

  const handleEditClick = () => {
    updateUi({
      activeExampleModelId: model.id,
      activeUtilityTab: UtilityTab.Properties,
    });
  };

  useListener(model);

  const isParentOfActiveExampleModelId = formalizer?.isChildOfParent({
    modelId: activeExampleModelId,
    parentId: model.id,
  });

  const backgroundColor =
    activeExampleModelId === model.id || isParentOfActiveExampleModelId
      ? palette.secondary.main
      : palette.primary.main;

  return (
    <Panel elevation={6} style={{ width, height }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ backgroundColor }} style={{ width: 8, height }}></Box>
        <Box sx={{ p: 2 }} style={{ width: width - 8, height }}>
          <Styled.Header>
            <Styled.Info>
              {handleProps && (
                <IconButton size="small" {...handleProps}>
                  <DragIndicatorIcon />
                </IconButton>
              )}
            </Styled.Info>
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
      </Box>
    </Panel>
  );
};
