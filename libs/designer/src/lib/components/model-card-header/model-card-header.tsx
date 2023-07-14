import { CardHeader, CardHeaderProps } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DesignerContext } from '../../context';
import { useListener } from '@formalizer/react';
import { FormalizedModel } from '@formalizer/core';
import { getUiModels } from '@formalizer/models';

const createState = (model?: FormalizedModel): CardHeaderProps => {
  const type = model?.type;
  const uiModels = getUiModels();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const uiModel = uiModels?.[type!];
  const Icon = uiModel?.icon;

  return {
    title: model?.title || model?.name,
    subheader: uiModel?.title,
    avatar: Icon ? <Icon /> : undefined,
  };
};

type ModelCardHeaderProps = {
  modelId?: string;
} & CardHeaderProps;

export const ModelCardHeader = ({ modelId, ...rest }: ModelCardHeaderProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);
  const [state, setState] = useState<CardHeaderProps>(createState(model));

  const listener = useListener(model);

  useEffect(() => {
    const newState = createState(listener.model);
    setState(newState);
  }, [listener]);

  return <CardHeader {...rest} {...state} />;
};
