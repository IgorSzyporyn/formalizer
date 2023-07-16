import { getUiModels } from '@formalizer/models';
import { useListener } from '@formalizer/react';
import { CardHeader, CardHeaderProps } from '@mui/material';
import { useContext } from 'react';
import { DesignerContext } from '../../context';

type ModelCardHeaderProps = {
  modelId?: string;
} & CardHeaderProps;

export const ModelCardHeader = ({ modelId, ...rest }: ModelCardHeaderProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);

  const type = model?.type;
  const uiModels = getUiModels();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const uiModel = uiModels?.[type!];
  const Icon = uiModel?.icon;

  useListener(model);

  return (
    <CardHeader
      {...rest}
      title={model?.title || model?.name}
      subheader={uiModel?.title}
      avatar={<Icon />}
    />
  );
};
