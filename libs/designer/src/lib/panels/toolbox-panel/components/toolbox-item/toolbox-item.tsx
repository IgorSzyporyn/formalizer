import { UiModel } from '@formalizer/models';
import * as Styled from './styled';

type ToolboxItemProps = {
  uiModel: UiModel;
};

export const ToolboxItem = ({ uiModel }: ToolboxItemProps) => {
  const Icon = uiModel.icon;

  return (
    <Styled.Wrapper>
      <Styled.Content elevation={4}>
        <Styled.Icon>
          <Icon />
        </Styled.Icon>
        <Styled.Title variant="overline">{uiModel.title}</Styled.Title>
      </Styled.Content>
    </Styled.Wrapper>
  );
};
