import { CollapseButton } from '@formalizer/components';
import { FormalizedModel } from '@formalizer/core';
import { getUiModels } from '@formalizer/models';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Card, IconButton } from '@mui/material';
import cx from 'classnames';
import { Variants } from 'framer-motion';
import { HTMLAttributes, forwardRef, memo, useCallback, useContext, useState } from 'react';
import { ModelCardHeader } from '../../../../components/model-card-header/model-card-header';
import { FormalizerContext, UiContext } from '../../../../context/designer-context';
import { CanvasTab, UtilityTab } from '../../../../typings/designer-types';
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
} & Omit<HTMLAttributes<HTMLLIElement>, 'id'>;

const cardPanelVariants: Variants = {
  open: { width: 'calc(100% - 80px)' },
  closed: { width: '100%' },
};

const cardEditVariants: Variants = {
  open: { scale: 1 },
  closed: { scale: 0.7 },
};

const cardButtonVariants: Variants = {
  closed: { opacity: 1, visibility: 'visible' },
  open: { opacity: 0, visibility: 'hidden' },
};

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

    const { updateUi, activeExampleModelId } = useContext(UiContext);
    const [cardOpen, setCardOpen] = useState(false);

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

    const style = {
      ...props.style,
      paddingLeft: indentationWidth * depth,
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
      <Styled.TreeWrapper {...props} className={wrapperCx} ref={wrapperRef} style={style}>
        <Styled.TreeItem ref={ref} className={treeItemCx}>
          <Styled.TreeItemInner>
            <Styled.TreemItemEditPanel
              variants={cardEditVariants}
              initial="closed"
              animate={cardOpen ? 'open' : 'closed'}
            >
              <IconButton
                onClick={handleRemoveCancelClick}
                title="Cancel and close"
                sx={{ mt: 1.5 }}
              >
                <HighlightOffIcon />
              </IconButton>
              <IconButton
                onClick={handleRemoveAcceptClick}
                title="irrevocably delete this model"
                sx={{ mt: 1.5, mr: 1 }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Styled.TreemItemEditPanel>
            <Styled.TreeItemCardPanel
              variants={cardPanelVariants}
              initial="closed"
              animate={cardOpen && !ghost ? 'open' : 'closed'}
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
                <Box sx={{ flexGrow: 1 }}>
                  <ModelCardHeader
                    sx={{ p: 2 }}
                    modelId={model?.id}
                    action={
                      <Styled.CardButtons
                        animate={cardOpen || ghost ? 'open' : 'closed'}
                        variants={cardButtonVariants}
                      >
                        {isGroup && (
                          <Styled.FocusButton
                            className="designer-layer-card__focus-button"
                            title="Focus the model"
                            onClick={handleExampleClick}
                          >
                            <RemoveRedEyeIcon />
                          </Styled.FocusButton>
                        )}

                        <Styled.PropertiesButton
                          className="designer-layer-card__properties-button"
                          onClick={handleEditClick}
                          title="Edit model properties"
                        >
                          <EditNoteIcon />
                        </Styled.PropertiesButton>

                        <Styled.RemoveButton
                          className="designer-layer-card__remove-button"
                          title="Delete the model"
                          onClick={handleRemoveClick}
                        >
                          <DeleteIcon />
                        </Styled.RemoveButton>

                        {hasItems && (
                          <CollapseButton collapsed={collapsed} onCollapseToggle={onCollapse} />
                        )}
                      </Styled.CardButtons>
                    }
                  />
                </Box>
              </Card>
            </Styled.TreeItemCardPanel>
          </Styled.TreeItemInner>
        </Styled.TreeItem>
      </Styled.TreeWrapper>
    );
  }
);

export const TreeItem = memo(_TreeItem);
