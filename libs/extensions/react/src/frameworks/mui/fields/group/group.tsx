import { ChevronRight } from '@mui/icons-material';
import { Collapse, FormControl, FormLabel, IconButton } from '@mui/material';
import { useState } from 'react';
import { FormalizerComponentProps } from '../../../../types';
import { FormGroup } from './form-group';
import * as Styled from './styled';

export const GroupField = (props: FormalizerComponentProps) => {
  const { model } = props;
  const [collapsed, setCollapsed] = useState(!!model?.collapsed);

  const handleCollapse = () => {
    setCollapsed((state) => !state);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = model?.icon as any;
  const isFullWidth = model?.inline || model?.fullWidth;

  return (
    <FormControl
      variant="outlined"
      sx={{ display: isFullWidth ? 'block' : 'initial', mb: 1 }}
    >
      {model?.title && (
        <FormLabel>
          <Styled.Legend sx={{ mb: 1 }}>
            <Styled.Info>
              {Icon && <Icon sx={{ mr: 1 }} />}
              <Styled.Title>{model?.title}</Styled.Title>
            </Styled.Info>
            {model?.collapsed !== undefined && (
              <Styled.Action
                variants={{
                  collapsed: { rotate: 0 },
                  expanded: { rotate: 90 },
                }}
                animate={collapsed ? 'collapsed' : 'expanded'}
              >
                <IconButton size="small" onClick={handleCollapse}>
                  <ChevronRight />
                </IconButton>
              </Styled.Action>
            )}
          </Styled.Legend>
        </FormLabel>
      )}
      {model?.collapsed !== undefined ? (
        <Collapse in={!collapsed}>
          <FormGroup {...props} />
        </Collapse>
      ) : (
        <FormGroup {...props} />
      )}
    </FormControl>
  );
};
