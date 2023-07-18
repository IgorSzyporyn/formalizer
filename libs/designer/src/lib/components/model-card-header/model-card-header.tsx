import { getUiModels } from '@formalizer/models';
import { useListener } from '@formalizer/react';
import { CardHeader, CardHeaderProps } from '@mui/material';
import { useContext } from 'react';
import { DesignerContext } from '../../designer-context';
import cx from 'classnames';

type ModelCardHeaderProps = {
  modelId?: string;
  size?: 'small' | 'medium' | 'large';
} & CardHeaderProps;

export const ModelCardHeader = ({
  modelId,
  className: _className = '',
  size = 'medium',
  ...rest
}: ModelCardHeaderProps) => {
  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(modelId);

  const type = model?.type;
  const uiModels = getUiModels();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const uiModel = uiModels?.[type!];
  const Icon = uiModel?.icon;

  useListener(model);

  const className = cx('model-card-header', {
    [`model-card-header--small`]: size === 'small',
    [`model-card-header--medium`]: size === 'medium',
    [`model-card-header--large`]: size === 'large',
    [_className]: !!_className,
  });

  return (
    <CardHeader
      {...rest}
      className={className}
      title={model?.title || model?.name}
      subheader={uiModel?.title}
      avatar={<Icon />}
    />
  );
};
