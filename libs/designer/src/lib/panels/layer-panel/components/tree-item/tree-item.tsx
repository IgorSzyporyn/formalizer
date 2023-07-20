import { CollapseButton } from '@formalizer/components';
import { FormalizedModel } from '@formalizer/core';
import { getUiModels } from '@formalizer/models';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Card, IconButton } from '@mui/material';
import cx from 'classnames';
import deepmerge from 'deepmerge';
import { Fragment, HTMLAttributes, forwardRef, useContext } from 'react';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';
import { FormalizerContext, UiContext } from '../../../../context/designer-context';
import * as Styled from './styled';
import { CanvasTab, UtilityTab } from '../../../../typings/designer-types';

export type TreeItemProps = {
  modelId?: string;
  childCount?: number;
  clone?: boolean;
  ghost?: boolean;
  disableInteraction?: boolean;
  disallowedMove?: boolean;
  depth: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any;
  indentationWidth: number;
  collapsed?: boolean;
  onCollapse?: () => void;
  onRemove?: () => void;
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
      disallowedMove,
      wrapperRef,
      collapsed,
      modelId,
      ...props
    },
    ref
  ) => {
    const { updateUi, activeExampleModelId } = useContext(UiContext);

    const formalizer = useContext(FormalizerContext);
    const model = formalizer?.getModel?.(modelId);

    const handleEditClick = () => {
      updateUi({
        activeEditModelId: modelId,
        activeUtilityTab: UtilityTab.Properties,
      });
    };

    const handleExampleClick = () => {
      updateUi({
        activeExampleModelId: modelId,
        activeCanvasTab: CanvasTab.Example,
      });
    };

    const wrapperCx = cx('designer-layer-card-wrapper', {
      'designer-layer-card-wrapper--ghost': ghost,
      'designer-layer-card-wrapper--clone': clone,
    });

    const treeItemCx = cx('designer-layer-card', {
      'designer-layer-card--ghost': ghost,
      'designer-layer-card--clone': clone,
      'designer-layer-card--disallowed': disallowedMove,
    });

    const isGroup = checkIsGroup(model);
    const hasItems = model?.items && model.items.length > 0;
    const isParentOfActiveExampleId = formalizer?.isChildOfParent({
      modelId: activeExampleModelId,
      parentId: model?.id,
    });

    let handleColor = isGroup ? 'primary' : 'neutral';

    if (activeExampleModelId === model?.id || (collapsed && isParentOfActiveExampleId)) {
      handleColor = 'secondary';
    }

    if (ghost && disallowedMove) {
      handleColor = 'error';
    }

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
              color={handleColor}
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
                  <Fragment>
                    <CollapseButton
                      collapsed={collapsed}
                      onCollapseToggle={onCollapse}
                      style={{ visibility: hasItems ? 'visible' : 'hidden' }}
                    />
                    {isGroup && (
                      <IconButton onClick={handleExampleClick}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={handleEditClick}>
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
