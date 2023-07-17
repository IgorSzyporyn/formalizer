import { FormalizedModel } from '@formalizer/core';
import { BoxProps, Collapse } from '@mui/material';
import { useState } from 'react';
import { Header } from '../header/header';
import * as Styled from './styled';
import { SizeType } from '../../typings';

type CollapsibleFieldProps = {
  model: FormalizedModel;
  size?: SizeType;
} & BoxProps;

export const CollapsibleField = ({
  model,
  children,
  size,
  ...rest
}: CollapsibleFieldProps) => {
  const {
    title,
    hint,
    description,
    layoutOnly,
    collapsible,
    fullWidth,
    collapsed: _collapsed = false,
  } = model;

  const [collapsed, setCollapsed] = useState(_collapsed);

  const hasHeader = title || hint || description || collapsible;

  const handleCollapseToggle = () => {
    setCollapsed((state) => !state);
  };

  return (
    <Styled.Wrapper {...rest}>
      {!layoutOnly && hasHeader && (
        <Header
          size={size}
          collapsed={collapsed}
          model={model}
          onCollapseToggle={handleCollapseToggle}
          sx={{ mb: 2 }}
        />
      )}
      {collapsible ? <Collapse in={!collapsed}>{children}</Collapse> : children}
    </Styled.Wrapper>
  );
};
