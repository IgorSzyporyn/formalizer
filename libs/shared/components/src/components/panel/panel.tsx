import { PaperProps } from '@mui/material';
import { CSSProperties, ReactNode, forwardRef } from 'react';
import * as Styled from './styled';

export type PanelProps = {
  bar?: ReactNode;
  barPosition?: 'vertical' | 'horizontal';
  noShadow?: boolean;
  transparent?: boolean;
  size?: 'small' | 'medium' | 'large';
} & PaperProps;

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      children,
      noShadow,
      bar,
      barPosition = 'vertical',
      elevation = 0,
      transparent,
      size = 'medium',
      style = {},
      sx = {},
      ...rest
    },
    ref
  ) => {
    const sxMap = {
      small: {
        wrapper: { ...sx },
        utilities: {
          vertical: { p: 0.75, pt: 1, pb: 1 },
          horizontal: { p: 0.75, pl: 1, pr: 1 },
        },
      },
      medium: {
        wrapper: { ...sx },
        utilities: {
          vertical: { p: 0.75, pt: 2, pb: 2 },
          horizontal: { p: 0.75, pl: 2, pr: 2 },
        },
      },
      large: {
        wrapper: { ...sx },
        utilities: {
          vertical: { p: 1.25, pt: 2, pb: 2 },
          horizontal: { p: 1.25, pl: 2, pr: 2 },
        },
      },
    };

    const wrapperStyle: CSSProperties = {};

    const utilityElevation = elevation + 3 > 5 ? 5 : elevation + 3;

    if (barPosition === 'vertical') {
      wrapperStyle.flexDirection = 'row';
    } else {
      wrapperStyle.flexDirection = 'column';
    }

    if (transparent) {
      wrapperStyle.backgroundColor = 'transparent';
      wrapperStyle.backgroundImage = 'none';
    }

    if (noShadow) {
      wrapperStyle.boxShadow = 'none';
    }

    return (
      <Styled.Wrapper
        {...rest}
        ref={ref}
        elevation={elevation}
        style={{ ...wrapperStyle, ...style }}
        sx={sxMap[size].wrapper}
      >
        {bar && (
          <Styled.UtilityBar
            sx={sxMap[size].utilities[barPosition]}
            elevation={utilityElevation}
          >
            {bar}
          </Styled.UtilityBar>
        )}
        <Styled.Main>{children}</Styled.Main>
      </Styled.Wrapper>
    );
  }
);
