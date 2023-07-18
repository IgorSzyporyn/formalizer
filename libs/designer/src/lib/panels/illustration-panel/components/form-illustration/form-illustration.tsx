import { Collapse } from '@mui/material';
import { useContext, useState } from 'react';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';
import { DesignerContext } from '../../../../designer-context';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';

type FormIllustrationProps = {
  modelId?: string;
};

export const FormIllustration = ({ modelId }: FormIllustrationProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => {
    setCollapsed((state) => !state);
  };

  return (
    <ModelCardHeader modelId={modelId}>
      <Collapse in={!collapsed}>
        <CreateIllustrations items={model?.items} />
      </Collapse>
    </ModelCardHeader>
  );
};
