import { FormalizedModel } from '@formalizer/core';
import { ChevronRight } from '@mui/icons-material';
import { BoxProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { MouseEvent, ReactNode } from 'react';
import { SizeType, TypographyMap } from '../../typings';
import * as Styled from './styled';

const typographyMap: TypographyMap = {
  small: { title: 'body2', hint: 'overline', description: 'subtitle2' },
  medium: { title: 'h6', hint: 'overline', description: 'body2' },
  large: { title: 'h4', hint: 'body1', description: 'h5' },
};

type HeaderProps = {
  model: FormalizedModel;
  onCollapseToggle?: (e: MouseEvent<HTMLButtonElement>) => void;
  title?: ReactNode;
  description?: ReactNode;
  hint?: ReactNode;
  collapsed?: boolean;
  icon?: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  size?: SizeType;
  preventInfo?: boolean;
} & BoxProps;

export const Header = ({
  model,
  title: _title,
  description: _description,
  onCollapseToggle,
  hint: _hint,
  icon: _icon,
  collapsed,
  size = 'medium',
  preventInfo,
  ...rest
}: HeaderProps) => {
  const { collapsible, description, hint, icon, title } = model;

  const Icon = _icon || icon;
  const Title = _title || title;
  const Hint = _hint || hint;
  const Description = _description || description;

  const typography = typographyMap[size];

  return (
    <Styled.Wrapper {...rest}>
      <Styled.Main>
        <Styled.Info>
          {Icon && !preventInfo && <Icon sx={{ mr: 1 }} />}
          {Title &&
            !preventInfo &&
            (_title || (
              <Styled.Title variant={typography.title}>{title}</Styled.Title>
            ))}
        </Styled.Info>
        {Hint &&
          !preventInfo &&
          (_hint || (
            <Styled.Hint variant={typography.hint}>{hint}</Styled.Hint>
          ))}
        {Description &&
          !preventInfo &&
          (_description || (
            <Styled.Description variant={typography.description}>
              {description}
            </Styled.Description>
          ))}
      </Styled.Main>
      <Styled.Action>
        {collapsible && (
          <Styled.AnimatedCollapse
            sx={{ rotate: collapsed ? '0deg' : '90deg' }}
          >
            <Styled.CollapseButton size={size} onClick={onCollapseToggle}>
              <ChevronRight />
            </Styled.CollapseButton>
          </Styled.AnimatedCollapse>
        )}
      </Styled.Action>
    </Styled.Wrapper>
  );
};
