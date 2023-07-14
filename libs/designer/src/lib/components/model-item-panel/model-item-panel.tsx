import { FormalizedModel } from '@formalizer/core';
import { getUiModels } from '@formalizer/models';
import { useListener } from '@formalizer/react';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { DesignerContext } from '../../context';
import { ActionPanel, ActionPanelProps } from '../action-panel/action-panel';

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

const createState = (model?: FormalizedModel): ModelItemPanelState => {
  const type = model?.type;
  const uiModels = getUiModels();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const uiModel = uiModels?.[type!];

  return {
    isGroup: checkIsGroup(model),
    title: model?.title || model?.name,
    subtitle: uiModel?.title,
    Icon: uiModel?.icon,
    modelId: model?.id || '',
  };
};

type ModelItemPanelState = {
  Icon?: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  title?: string;
  subtitle?: string;
  modelId?: string;
  isGroup?: boolean;
};

type ModelItemPanelProps = {
  modelId?: string;
} & ActionPanelProps;

export const ModelItemPanel = forwardRef<HTMLDivElement, ModelItemPanelProps>(
  ({ id, modelId, children, size, ...rest }, ref) => {
    const { formalizer } = useContext(DesignerContext);
    const model = formalizer?.getModel(modelId);
    const [state, setState] = useState<ModelItemPanelState>(createState(model));
    const changes = useListener(model);

    useEffect(() => {
      if (changes) {
        setState(createState(changes));
      }
    }, [changes]);

    const actionPanelType =
      model?.type === 'form'
        ? 'primary'
        : state.isGroup
        ? 'neutral'
        : 'neutral';

    return (
      <ActionPanel
        {...rest}
        className="model-item-panel"
        ref={ref}
        size={size}
        title={state.title}
        subtitle={size !== 'small' ? state.subtitle : ''}
        Icon={state.Icon}
        type={actionPanelType}
      >
        {children}
      </ActionPanel>
    );
  }
);
