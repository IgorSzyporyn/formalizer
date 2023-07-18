import { useContext } from 'react';
import { DesignerContext } from '../../../../designer-context';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';
import * as Styled from './styled';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';

type GridIllustrationProps = {
  modelId?: string;
};

export const GridIllustration = ({ modelId }: GridIllustrationProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);

  return (
    <Styled.Wrapper sx={{ m: 1.5 }}>
      <ModelCardHeader modelId={modelId}>
        <Styled.Content $columns={model?.columns} sx={{ p: 1.5 }}>
          <CreateIllustrations items={model?.items} />
        </Styled.Content>
      </ModelCardHeader>
    </Styled.Wrapper>
  );
};
