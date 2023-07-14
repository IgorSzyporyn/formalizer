import { useTheme } from '@emotion/react';
import { PanelProps } from '@formalizer/components';
import { Box, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { CSSProperties, ReactNode, forwardRef } from 'react';
import * as Styled from './styled';

export type ActionPanelProps = {
  Icon?: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  title?: string;
  subtitle?: string;
  Action?: ReactNode;
  Optional?: ReactNode;
  children?: ReactNode;
  bordered?: boolean;
  type?: 'primary' | 'secondary' | 'neutral';
} & PanelProps;

export const ActionPanel = forwardRef<HTMLDivElement, ActionPanelProps>(
  (
    {
      Icon,
      title,
      subtitle,
      Action,
      Optional,
      noShadow,
      type = 'primary',
      children,
      bordered,
      size = 'medium',
      elevation = 1,
      ...rest
    },
    ref
  ) => {
    const { palette } = useTheme();

    const style: CSSProperties = { border: '0px solid transparent' };

    if (bordered) {
      style.border = `2px solid ${palette[type].main}`;
    }

    const iconSizeMap = { small: 16, medium: 22, large: 26 };
    const headerSxMap = {
      small: { p: 1 },
      medium: { p: 1.5 },
      large: { p: 2 },
    };

    return (
      <Styled.Wrapper
        className="action-panel"
        noShadow={noShadow}
        elevation={elevation}
        ref={ref}
        style={style}
        size={size}
        {...rest}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
          className="action-panel-inner"
        >
          <Styled.Optional
            sx={{
              backgroundColor: palette[type].main,
              pl: 0.5,
              pr: 0.5,
            }}
          >
            {Optional}
          </Styled.Optional>
          <Box sx={{ flexGrow: 1 }}>
            <Styled.Header sx={headerSxMap[size]}>
              <Styled.Info>
                {Icon && (
                  <Icon
                    sx={{ mr: 1 }}
                    style={{ fontSize: iconSizeMap[size] }}
                  />
                )}
                {(title || subtitle) && (
                  <Styled.Text>
                    {title && <Styled.Title variant="h6">{title}</Styled.Title>}
                    {subtitle && (
                      <Styled.Subtitle variant="h4">{subtitle}</Styled.Subtitle>
                    )}
                  </Styled.Text>
                )}
              </Styled.Info>
              {Action && <Styled.Action>{Action}</Styled.Action>}
            </Styled.Header>
            {children && (
              <Styled.Main className="action-panel-main">
                {children}
              </Styled.Main>
            )}
          </Box>
        </Box>
      </Styled.Wrapper>
    );
  }
);
