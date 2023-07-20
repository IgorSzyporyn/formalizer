import { useContext } from 'react';
import { FormalizerContext } from '../../context/designer-context';
import { SortablePanel } from './components/sortable-container/sortable-panel/sortable-panel';

const ratio = 1.41;
const itemWidth = 120;
const itemHeight = itemWidth * ratio;
const gap = 20;

export const OverviewPanel = () => {
  const formalizer = useContext(FormalizerContext);
  const rootModel = formalizer?.getRootModel();

  return (
    rootModel && (
      <SortablePanel
        model={rootModel}
        columns={1}
        itemWidth={itemWidth}
        itemHeight={itemHeight}
        gap={gap}
      />
    )
  );
};
