import { BoxProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ReactNode } from 'react';
import * as Styled from './styled';

type PanelHeaderProps = {
  children?: ReactNode;
  Icon?: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  Info?: ReactNode;
  title?: string;
  Action?: ReactNode;
  description?: ReactNode;
} & BoxProps;

export const PanelHeader = ({
  children,
  Icon,
  Info,
  title,
  Action: action,
  description,
  ...rest
}: PanelHeaderProps) => {
  const hasInfo = Info || Icon || title;

  return (
    <Styled.Wrapper {...rest}>
      <Styled.Header sx={{ p: 4, pl: 3, pr: 3 }}>
        {hasInfo && (
          <Styled.Info>
            {Icon && <Icon />}
            {title && (
              <Styled.Title variant="h6" sx={{ pl: 1 }}>
                {title}
              </Styled.Title>
            )}
            {Info}
          </Styled.Info>
        )}
        <Styled.Action>{action}</Styled.Action>
      </Styled.Header>
      {description && (
        <Styled.Description variant="body2" sx={{ pl: 3, pr: 3, mb: 2 }}>
          {description}
        </Styled.Description>
      )}
      {children && <Styled.Content sx={{ pt: 3 }}>{children}</Styled.Content>}
    </Styled.Wrapper>
  );
};
