import { Box, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type EditActionProps = {
  onCancelClick: () => void;
  onAcceptClick: () => void;
};

export const EditAction = ({ onAcceptClick, onCancelClick }: EditActionProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'panel.light',
        position: 'absolute',
        top: 4,
        bottom: 4,
        left: 0,
        right: 0,
        borderRadius: 1,
        boxShadow: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      }}
    >
      <IconButton onClick={onCancelClick} title="Cancel and close" sx={{ mt: 1.5 }}>
        <HighlightOffIcon />
      </IconButton>
      <IconButton
        color="error"
        onClick={onAcceptClick}
        title="irrevocably delete this model"
        sx={{ mt: 1.5, mr: 1 }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Box>
  );
};
