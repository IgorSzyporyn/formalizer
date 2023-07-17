import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, IconButton } from '@mui/material';
import { Fragment } from 'react';
import { ModelItemPanel } from '../../../../components/model-item-panel/model-item-panel';

type IllustrationSingleProps = {
  modelId?: string;
  elevation: number;
};

export const IllustrationSingle = ({
  modelId,
  elevation,
}: IllustrationSingleProps) => {
  return (
    <Box sx={{ m: 1.5 }}>
      <ModelItemPanel
        size="small"
        noShadow
        bordered
        id={`illustration-single-${modelId}`}
        modelId={modelId}
        Action={
          <Fragment key="form-illustration-action">
            <IconButton sx={{ mr: 1 }}>
              <EditNoteIcon />
            </IconButton>
          </Fragment>
        }
      />
    </Box>
  );
};
