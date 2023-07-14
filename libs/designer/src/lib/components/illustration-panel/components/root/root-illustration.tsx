import { useContext } from 'react';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';
import { DesignerContext } from '../../../../context';

type RootIllustrationProps = {
  modelId?: string;
};

export const RootIllustration = ({ modelId }: RootIllustrationProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);

  return <CreateIllustrations items={model?.items} />;
};
