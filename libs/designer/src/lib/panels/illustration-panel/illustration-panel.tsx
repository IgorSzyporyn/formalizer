import { Box } from '@mui/material';
import { useContext } from 'react';
import { FormalizerContext, UiContext } from '../../context/designer-context';
import { RootIllustration } from './fields/root/root-illustration';

export const IllustrationPanel = () => {
  const formalizer = useContext(FormalizerContext);
  const { activeFocusModelId } = useContext(UiContext);
  const model = formalizer?.getModel(activeFocusModelId);

  return <Box sx={{ pr: 2.5, pl: 2.5 }}>{model && <RootIllustration model={model} />}</Box>;
};
