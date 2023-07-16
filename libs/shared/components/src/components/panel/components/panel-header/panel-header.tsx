import { BoxProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ReactNode } from 'react';
import * as Styled from './styled';

type PanelHeaderProps = {
  children?: ReactNode;
  Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  title: string;
  Action?: ReactNode;
  description?: ReactNode;
} & BoxProps;

export const PanelHeader = ({
  children,
  Icon,
  title,
  Action: action,
  description,
  ...rest
}: PanelHeaderProps) => {
  return (
    <Styled.Wrapper {...rest}>
      <Styled.Header sx={{ p: 2, mb: 1, height: 80 }}>
        <Styled.Info>
          <Icon />
          <Styled.Title variant="h6" sx={{ pl: 1 }}>
            {title}
          </Styled.Title>
        </Styled.Info>
        <Styled.Action>{action}</Styled.Action>
      </Styled.Header>
      {description && (
        <Styled.Description variant="body2" sx={{ pl: 2, pr: 2 }}>
          {description}
        </Styled.Description>
      )}
      <Styled.Content sx={{ pt: 3 }}>{children}</Styled.Content>
    </Styled.Wrapper>
  );
};
