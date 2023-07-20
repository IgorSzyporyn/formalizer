import { Formalizer, useFormalizer } from '@formalizer/react';
import { useContext } from 'react';
import { FormalizerContext, UiContext } from '../../context/designer-context';
import * as Styled from './styled';

export const ExamplePanel = () => {
  const _formalizer = useContext(FormalizerContext);
  const { activeExampleModelId } = useContext(UiContext);

  const formalizer = useFormalizer({
    formalizer: _formalizer,
    framework: 'mui',
  });

  return (
    <Styled.Wrapper>
      <Styled.Box>
        <Formalizer formalizer={formalizer} modelId={activeExampleModelId} auto />
      </Styled.Box>
    </Styled.Wrapper>
  );
};
