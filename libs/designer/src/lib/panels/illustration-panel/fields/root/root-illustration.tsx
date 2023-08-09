import { FormalizedModel } from '@formalizer/core';
import { CreateIllustration } from '../../components/create-illustration/create-illustration';

type RootIllustrationProps = {
  model: FormalizedModel;
};

export const RootIllustration = ({ model }: RootIllustrationProps) => {
  return <CreateIllustration model={model} allowFocus={false} allowEdit={false} isRoot />;
};
