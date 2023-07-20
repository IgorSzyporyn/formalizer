import { useContext } from 'react';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';
import { FormalizerContext } from '../../../../context/designer-context';

type RootIllustrationProps = {
  modelId?: string;
};

export const RootIllustration = ({ modelId }: RootIllustrationProps) => {
  const formalizer = useContext(FormalizerContext);
  const model = formalizer?.getModel(modelId);

  return <CreateIllustrations items={model?.items} />;
};
