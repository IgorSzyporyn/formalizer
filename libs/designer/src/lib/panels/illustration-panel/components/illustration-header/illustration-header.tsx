import { FormalizedModel } from '@formalizer/core';
import { BoxProps } from '@mui/material';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';
import { IllustrationButtons } from '../illustration-buttons/illustration-buttons';
import * as Styled from './styled';

type IllustrationHeaderProps = {
  model: FormalizedModel;
  onEditClick?: () => void;
  onFocusClick?: () => void;
  allowFocus?: boolean;
  allowEdit?: boolean;
  size?: 'small' | 'medium' | 'large';
  isRoot?: boolean;
} & BoxProps;

export const IllustrationHeader = ({
  model,
  onEditClick,
  onFocusClick,
  allowFocus,
  allowEdit,
  size,
  isRoot: _,
  ...props
}: IllustrationHeaderProps) => {
  return (
    <Styled.Wrapper {...props} className="illustration-header">
      <ModelCardHeader size={size} modelId={model.id} sx={{ p: 0 }} />
      <IllustrationButtons
        onEditClick={onEditClick}
        onFocusClick={onFocusClick}
        allowFocus={allowFocus}
        allowEdit={allowEdit}
      />
    </Styled.Wrapper>
  );
};
