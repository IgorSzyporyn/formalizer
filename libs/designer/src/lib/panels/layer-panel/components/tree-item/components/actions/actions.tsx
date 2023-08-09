import { CollapseButton } from '@formalizer/components';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { IconButton } from '@mui/material';
import { Variants, motion } from 'framer-motion';

const actionVariants: Variants = {
  show: { opacity: 1, transition: { duration: 0.225, delay: 0.225 } },
  hide: { opacity: 0, transition: { duration: 0.125 } },
};

type ActionsProps = {
  collapsed?: boolean;
  hasItems?: boolean;
  isOpen?: boolean;
  isHovering?: boolean;
  isGroup?: boolean;
  onCollapseClick?: () => void;
  onEditClick?: () => void;
  onFocusClick?: () => void;
  onRemoveClick?: () => void;
};

export const Actions = ({
  collapsed,
  hasItems,
  isHovering,
  isGroup,
  isOpen,
  onCollapseClick,
  onEditClick,
  onFocusClick,
  onRemoveClick,
}: ActionsProps) => {
  const width = isGroup ? 3 * 32 : 2 * 32;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'flex-end' }}>
      <motion.div
        style={{ display: 'flex', alignItems: 'center', flexGrow: 1, overflow: 'hidden' }}
        animate={isHovering && !isOpen ? 'show' : 'hide'}
        initial="hide"
        variants={{
          show: { width, transition: { duration: 0.225 } },
          hide: { width: 0, transition: { duration: 0.0875, delay: 0.125 } },
        }}
      >
        {
          /*isGroup &&*/ <motion.div key="focus" variants={actionVariants}>
            <IconButton title="Focus the model" onClick={onFocusClick}>
              <RemoveRedEyeIcon />
            </IconButton>
          </motion.div>
        }
        <motion.div key="properties" variants={actionVariants}>
          <IconButton onClick={onEditClick} title="Edit model properties">
            <EditNoteIcon />
          </IconButton>
        </motion.div>{' '}
        <motion.div key="remove" variants={actionVariants}>
          <IconButton title="Delete the model" onClick={onRemoveClick}>
            <DeleteIcon />
          </IconButton>
        </motion.div>
      </motion.div>
      {hasItems && (
        <CollapseButton collapsed={collapsed} onCollapseToggle={onCollapseClick} />
      )}
    </div>
  );
};
