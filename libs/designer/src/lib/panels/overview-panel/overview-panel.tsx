import { Box } from '@mui/material';
import { useContext } from 'react';
import { DesignerContext } from '../../designer-context';
import { SortablePanel } from './components/sortable-panel/sortable-panel';

export const OverviewPanel = () => {
  const { formalizer } = useContext(DesignerContext);
  const rootModel = formalizer?.getRootModel();

  return (
    <Box>{rootModel && <SortablePanel model={rootModel} columns={5} />}</Box>
  );
};
