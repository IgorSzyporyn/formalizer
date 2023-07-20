import { Box, Collapse } from '@mui/material';
import { useContext, useState } from 'react';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';
import { FormalizerContext } from '../../../../context/designer-context';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';

type IllustrationNestedProps = {
  modelId?: string;
};

export const IllustrationNested = ({ modelId }: IllustrationNestedProps) => {
  const formalizer = useContext(FormalizerContext);
  const model = formalizer?.getModel(modelId);
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapsed = () => {
    setCollapsed((state) => !state);
  };

  return (
    <Box sx={{ m: 1.5 }}>
      <ModelCardHeader modelId={modelId}>
        <Collapse in={!collapsed}>
          <CreateIllustrations items={model?.items} />
        </Collapse>
      </ModelCardHeader>
    </Box>
  );
};
