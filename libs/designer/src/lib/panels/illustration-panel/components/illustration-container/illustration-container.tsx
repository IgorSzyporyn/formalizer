import { FormalizedModel } from '@formalizer/core';
import { BoxProps, SxProps } from '@mui/material';
import { CSSProperties } from 'react';
import * as Styled from './styled';

type IllustrationContainerProps = {
  model: FormalizedModel;
} & BoxProps;

export const IllustrationContainer = ({ model, ...props }: IllustrationContainerProps) => {
  const { direction } = model;

  let style: CSSProperties = {};
  let sx: SxProps = {};

  if (direction === 'horizontal') {
    style = {
      display: 'inline-flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      width: '100%',
    };

    sx = {
      '& > *': {
        mr: 2,
        '&:last-child': {
          mr: 0,
        },
      },
    };
  }

  return (
    <Styled.Wrapper
      {...props}
      className="illustration-container"
      sx={{ pl: 4.5, ...sx, ...(props.sx || {}) }}
      style={{ minWidth: 450, ...style, ...(props.style || {}) }}
    />
  );
};
