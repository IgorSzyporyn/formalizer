import { useTheme } from '@emotion/react';
import { Panel } from '@formalizer/components';
import { FormalizedModel } from '@formalizer/core';
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { FormalizerContext, UiContext } from '../../../../context/designer-context';
import * as Styled from './styled';

type OverviewFormProps = {
  model: FormalizedModel;
  width: number;
  height: number;
};

export const OverviewForm = ({ model, width, height }: OverviewFormProps) => {
  const { activeFocusModelId } = useContext(UiContext);
  const formalizer = useContext(FormalizerContext);
  const { palette } = useTheme();

  const isParentOfActiveExampleModelId = formalizer?.isChildOfParent({
    modelId: activeFocusModelId,
    parentId: model.id,
  });

  const backgroundColor =
    activeFocusModelId === model.id || isParentOfActiveExampleModelId
      ? palette.secondary.main
      : palette.primary.main;

  return (
    <Panel elevation={6} style={{ width, height }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ backgroundColor }} style={{ width: 8, height }}></Box>
        <Styled.Info sx={{ p: 2 }} style={{ width: width - 8, height }}>
          <Typography variant="body2">{model.title || model.name}</Typography>
        </Styled.Info>
      </Box>
    </Panel>
  );
};
