import { CollapseButton } from '@formalizer/components';
import { FormalizedModel } from '@formalizer/core';
import { getUiModels } from '@formalizer/models';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button, Card, IconButton } from '@mui/material';
import cx from 'classnames';
import deepmerge from 'deepmerge';
import { Fragment, HTMLAttributes, forwardRef, useContext } from 'react';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';
import {
  DesignerContext,
  DesignerUiContext,
  UtilityTab,
} from '../../../../context';
import * as Styled from './styled';

export type TreeItemProps = {
  modelId?: string;
  childCount?: number;
  clone?: boolean;
  ghost?: boolean;
  disableInteraction?: boolean;
  depth: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any;
  indentationWidth: number;
  collapsed?: boolean;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
} & Omit<HTMLAttributes<HTMLLIElement>, 'id'>;

const checkIsGroup = (model?: FormalizedModel) => {
  const type = model?.type;
  const uiModels = getUiModels();
  let isGroup = false;

  if (uiModels && type) {
    const uiModel = uiModels[type];
    isGroup = !!uiModel?.accepts?.length;
  }

  return isGroup;
};

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      clone,
      depth,
      ghost,
      handleProps,
      indentationWidth,
      onCollapse,
      onRemove,
      wrapperRef,
      collapsed,
      modelId,
      ...props
    },
    ref
  ) => {
    const { updateUiContext, utilities } = useContext(DesignerUiContext);

    const { formalizer } = useContext(DesignerContext);
    const model = formalizer?.getModel?.(modelId);

    const handleEditClick = () => {
      updateUiContext({
        activeModelId: modelId,
        utilities: { ...utilities, activeTab: UtilityTab.Properties },
      });
    };

    const wrapperCx = cx('designer-layer-card-wrapper', {
      'designer-layer-card-wrapper--ghost': ghost,
      'designer-layer-card-wrapper--clone': clone,
    });

    const treeItemCx = cx('designer-layer-card', {
      'designer-layer-card--ghost': ghost,
      'designer-layer-card--clone': clone,
    });

    const isGroup = checkIsGroup(model);
    const hasItems = model?.items && model.items.length > 0;

    return (
      <Styled.TreeWrapper
        {...props}
        className={wrapperCx}
        ref={wrapperRef}
        style={deepmerge(props.style || {}, {
          paddingLeft: indentationWidth * depth,
        })}
      >
        <Styled.TreeItem ref={ref} className={treeItemCx}>
          <Card sx={{ display: 'flex' }}>
            <Button
              {...handleProps}
              color={isGroup ? 'primary' : 'neutral'}
              sx={{
                width: 18,
                minWidth: 18,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <DragIndicatorIcon />
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <ModelCardHeader
                modelId={model?.id}
                action={
                  <Fragment key={`layer-card-action-${model?.id}`}>
                    <CollapseButton
                      size="medium"
                      collapsed={collapsed}
                      onCollapseToggle={onCollapse}
                      key={`layer-card-action-collapse-${model?.id}`}
                      style={{ visibility: hasItems ? 'visible' : 'hidden' }}
                    />
                    <IconButton
                      key={`layer-card-action-edit-${model?.id}`}
                      size="medium"
                      onClick={handleEditClick}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </Fragment>
                }
              />
            </Box>
          </Card>
        </Styled.TreeItem>
      </Styled.TreeWrapper>
    );
  }
);
