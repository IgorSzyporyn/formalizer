import * as Styled from './styled';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { BoxProps, IconButton } from '@mui/material';

type IllustrationButtonsProps = {
  onFocusClick?: () => void;
  onEditClick?: () => void;
  allowFocus?: boolean;
  allowEdit?: boolean;
} & BoxProps;

export const IllustrationButtons = ({
  onFocusClick,
  onEditClick,
  allowFocus = true,
  allowEdit = true,
  ...props
}: IllustrationButtonsProps) => {
  return onFocusClick || onEditClick ? (
    <Styled.Wrapper
      {...props}
      sx={{ ...(props.sx || {}), ml: 1 }}
      className="illustration-header__buttton-container"
    >
      {allowFocus && (
        <IconButton onClick={onFocusClick}>
          <RemoveRedEyeIcon />
        </IconButton>
      )}
      {allowEdit && (
        <IconButton onClick={onEditClick}>
          <EditNoteIcon />
        </IconButton>
      )}
    </Styled.Wrapper>
  ) : null;
};
