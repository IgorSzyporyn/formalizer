import { FormalizedModel } from '@formalizer/core';
import { getUiModels } from '@formalizer/models';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, Card } from '@mui/material';
import cx from 'classnames';
import { HTMLMotionProps } from 'framer-motion';
import { forwardRef, memo, useCallback, useContext, useRef, useState } from 'react';
import { useHover } from 'usehooks-ts';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';
import { FormalizerContext, UiContext } from '../../../../context/designer-context';
import { UtilityTab } from '../../../../typings/designer-types';
import { Actions } from './components/actions/actions';
import { EditAction } from './components/edit-action/edit-action';
import * as Styled from './styled';

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
} & Omit<HTMLMotionProps<'li'>, 'id'>;

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

const _TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
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
    const formalizer = useContext(FormalizerContext);
    const model = formalizer?.getModel?.(modelId);

    const { updateUi, activeFocusModelId: activeExampleModelId } = useContext(UiContext);
    const [cardOpen, setCardOpen] = useState(false);
    const innerRef = useRef(null);
    // const isHovering = useHover(innerRef);

    const handleEditClick = useCallback(() => {
      updateUi({
        activeEditModelId: modelId,
        activeUtilityTab: UtilityTab.Properties,
      });
    }, [modelId, updateUi]);

    const handleFocusClick = useCallback(() => {
      console.log(model);
      updateUi({
        activeFocusModelId: modelId,
      });
    }, [model, modelId, updateUi]);

    const handleRemoveClick = useCallback(() => {
      setCardOpen((state) => !state);
    }, []);

    const handleRemoveAcceptClick = useCallback(() => {
      setCardOpen(false);
      onRemove?.();
    }, [onRemove]);

    const handleRemoveCancelClick = useCallback(() => {
      setCardOpen(false);
    }, []);

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
        style={{
          ...props.style,
          paddingLeft: indentationWidth * depth,
        }}
      >
        <Styled.TreeItem ref={ref} className={treeItemCx}>
          <div ref={innerRef}>
            <EditAction
              onAcceptClick={handleRemoveAcceptClick}
              onCancelClick={handleRemoveCancelClick}
            />
            <Styled.TreeItemCardPanel
              variants={{
                cardOpen: { width: 'calc(100% - 80px)', transition: { delay: 0.225 } },
                cardClosed: { width: '100%' },
              }}
              initial="cardClosed"
              animate={cardOpen && !ghost ? 'cardOpen' : 'cardClosed'}
            >
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
                <ModelCardHeader
                  key={model?.id}
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    maxWidth: `calc(100% - ${indentationWidth}px)`,
                  }}
                  modelId={model?.id}
                  action={
                    <Actions
                      collapsed={collapsed}
                      hasItems={hasItems}
                      isGroup={isGroup}
                      isOpen={cardOpen}
                      isHovering={true}
                      onCollapseClick={onCollapse}
                      onEditClick={handleEditClick}
                      onFocusClick={handleFocusClick}
                      onRemoveClick={handleRemoveClick}
                    />
                  }
                />
              </Card>
            </Styled.TreeItemCardPanel>
          </div>
        </Styled.TreeItem>
      </Styled.TreeWrapper>
    );
  }
);

export const TreeItem = memo(_TreeItem);
