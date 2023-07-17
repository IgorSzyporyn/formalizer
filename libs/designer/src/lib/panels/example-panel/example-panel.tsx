import { Formalizer, useFormalizer } from '@formalizer/react';
import { useContext } from 'react';
import { DesignerContext } from '../../designer-context';
import * as Styled from './styled';

export const ExamplePanel = () => {
  const { formalizer: _formalizer } = useContext(DesignerContext);

  const formalizer = useFormalizer({
    formalizer: _formalizer,
    framework: 'mui',
  });

  return (
    <Styled.Wrapper>
      <Styled.Box>
        <Formalizer formalizer={formalizer} auto />
      </Styled.Box>
    </Styled.Wrapper>
  );
};
