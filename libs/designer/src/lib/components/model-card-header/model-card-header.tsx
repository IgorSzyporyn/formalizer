import { getUiModels } from '@formalizer/models';
import { useListener } from '@formalizer/react';
import { CardHeaderProps } from '@mui/material';
import { CSSProperties, useContext } from 'react';
import { FormalizerContext } from '../../context/designer-context';
import * as Styled from './styled';
import cx from 'classnames';

type TypographyMapType = {
  title: {
    small: CardHeaderProps['titleTypographyProps'];
    medium: CardHeaderProps['titleTypographyProps'];
    large: CardHeaderProps['titleTypographyProps'];
  };
  subheader: {
    small: CardHeaderProps['subheaderTypographyProps'];
    medium: CardHeaderProps['subheaderTypographyProps'];
    large: CardHeaderProps['subheaderTypographyProps'];
  };
  icon: {
    small: CSSProperties['fontSize'];
    medium: CSSProperties['fontSize'];
    large: CSSProperties['fontSize'];
  };
};

type ModelCardHeaderProps = {
  modelId?: string;
  size?: 'small' | 'medium' | 'large';
  noSubheader?: boolean;
  noAvatar?: boolean;
} & CardHeaderProps;

export const ModelCardHeader = ({
  modelId,
  className: _className = '',
  size = 'medium',
  noSubheader,
  noAvatar,
  ...rest
}: ModelCardHeaderProps) => {
  const formalizer = useContext(FormalizerContext);
  const model = formalizer?.getModel(modelId);

  const type = model?.type;
  const uiModels = getUiModels();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const uiModel = uiModels?.[type!];
  const Icon = uiModel?.icon;

  useListener(model);

  const typographyMap: TypographyMapType = {
    title: {
      small: {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.3,
        letterSpacing: '0.01071em',
      },
      medium: {
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
      large: {},
    },
    subheader: {
      small: {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.3,
        letterSpacing: '0.01071em',
      },
      medium: {
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
      large: {},
    },
    icon: {
      small: '1.25rem',
      medium: '1.5rem',
      large: 16,
    },
  };

  const className = cx('model-card-header', {
    [`model-card-header--small`]: size === 'small',
    [`model-card-header--medium`]: size === 'medium',
    [`model-card-header--large`]: size === 'large',
    [_className]: !!_className,
  });

  return (
    <Styled.Wrapper
      {...rest}
      titleTypographyProps={{
        ...typographyMap.title[size],
        noWrap: true,
        textOverflow: 'ellipsis',
      }}
      subheaderTypographyProps={{
        ...typographyMap.subheader[size],
        noWrap: true,
        textOverflow: 'ellipsis',
      }}
      sx={{
        ...(rest.sx || {}),
        '& .MuiCardHeader-content': {
          display: 'block',
          overflow: 'hidden',
        },
      }}
      className={className}
      title={model?.title || model?.name}
      subheader={!noSubheader && uiModel?.title}
      avatar={Icon && !noAvatar && <Icon style={{ fontSize: typographyMap.icon[size] }} />}
    />
  );
};
