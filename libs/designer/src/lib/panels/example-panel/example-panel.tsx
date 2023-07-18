import { Formalizer, useFormalizer } from '@formalizer/react';
import { useContext } from 'react';
import { DesignerContext, DesignerUiContext } from '../../designer-context';
import * as Styled from './styled';

export const ExamplePanel = () => {
  const { formalizer: _formalizer } = useContext(DesignerContext);
  const { activeModelId } = useContext(DesignerUiContext);

  const formalizer = useFormalizer({
    formalizer: _formalizer,
    framework: 'mui',
  });

  return (
    <Styled.Wrapper>
      <Styled.Box>
        <Formalizer formalizer={formalizer} modelId={activeModelId} auto />
      </Styled.Box>
    </Styled.Wrapper>
  );
};
