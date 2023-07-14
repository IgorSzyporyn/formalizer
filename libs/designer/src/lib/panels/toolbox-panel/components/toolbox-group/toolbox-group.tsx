import { CollapseButton } from '@formalizer/components';
import { UiGroupModel } from '@formalizer/models';
import { AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import { ActionPanel } from '../../../../components/action-panel/action-panel';
import { ToolboxItem } from '../toolbox-item/toolbox-item';
import * as Styled from './styled';

const contentAnimation: Variants = {
  open: { opacity: 1, height: 'auto' },
  collapsed: { opacity: 0, height: 0 },
};

type ToolboxGroupProps = {
  uiGroupModel: UiGroupModel;
};

export const ToolboxGroup = ({ uiGroupModel }: ToolboxGroupProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleExpandClick = () => {
    setCollapsed((state) => !state);
  };

  return (
    <Styled.Wrapper>
      <ActionPanel
        Icon={uiGroupModel.icon}
        type="primary"
        title={uiGroupModel.title}
        subtitle={uiGroupModel.description}
        Action={
          <CollapseButton
            collapsed={collapsed}
            key={`toolbox-group-expand-${uiGroupModel.type}`}
            onCollapseToggle={handleExpandClick}
          />
        }
      />
      <AnimatePresence initial={false}>
        {!collapsed && (
          <Styled.Content
            variants={contentAnimation}
            key={`toolbox-group-content-${uiGroupModel.type}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
          >
            <Styled.ContentGrid>
              {uiGroupModel.items.map((uiModel, index) => {
                return (
                  <ToolboxItem
                    key={`toolbox-group-${uiGroupModel.type}-${index}`}
                    uiModel={uiModel}
                  />
                );
              })}
            </Styled.ContentGrid>
          </Styled.Content>
        )}
      </AnimatePresence>
    </Styled.Wrapper>
  );
};
