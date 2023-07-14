import { useContext } from 'react';
import { DesignerContext } from '../../../../context';
import { illustrationModels } from '../../models/illustration-panel-model';

type CreateIllustrationProps = {
  modelId?: string;
};

export const CreateIllustration = ({ modelId }: CreateIllustrationProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);

  let Component;

  if (model) {
    const illustrationModel = illustrationModels[model?.type];
    Component = illustrationModel.Component;
  }

  return Component ? <Component modelId={model?.id} /> : null;
};
