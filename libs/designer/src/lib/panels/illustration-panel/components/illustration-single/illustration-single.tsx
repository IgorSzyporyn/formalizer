import { Box } from '@mui/material';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';

type IllustrationSingleProps = {
  modelId?: string;
};

export const IllustrationSingle = ({ modelId }: IllustrationSingleProps) => {
  return (
    <Box sx={{ m: 1.5 }}>
      <ModelCardHeader modelId={modelId} />
    </Box>
  );
};
