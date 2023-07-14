import { RootIllustration } from './components/root/root-illustration';
import * as Styled from './styled';

type IllustrationPanelProps = {
  id?: string;
};

export const IllustrationPanel = ({ id }: IllustrationPanelProps) => {
  return (
    <Styled.Wrapper>
      <Styled.Box>
        <RootIllustration modelId={id} />
      </Styled.Box>
    </Styled.Wrapper>
  );
};
