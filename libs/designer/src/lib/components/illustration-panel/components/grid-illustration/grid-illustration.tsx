import { useContext } from 'react';
import { DesignerContext } from '../../../../context';
import { ModelItemPanel } from '../../../model-item-panel/model-item-panel';
import { CreateIllustrations } from '../create-illustrations/create-illustrations';
import * as Styled from './styled';

type GridIllustrationProps = {
  modelId?: string;
  elevation: number;
};

export const GridIllustration = ({
  modelId,
  elevation,
}: GridIllustrationProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);

  return (
    <Styled.Wrapper sx={{ m: 1.5 }}>
      <ModelItemPanel
        noShadow
        bordered
        id={`illustration-grid-${modelId}`}
        modelId={modelId}
      >
        <Styled.Content $columns={model?.columns} sx={{ p: 1.5 }}>
          <CreateIllustrations items={model?.items} />
        </Styled.Content>
      </ModelItemPanel>
    </Styled.Wrapper>
  );
};
