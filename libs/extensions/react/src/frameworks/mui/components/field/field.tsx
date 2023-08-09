import { FormalizedModel } from '@formalizer/core';
import { FormControl, FormControlProps } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

export type FieldProps = {
  model: FormalizedModel;
  children: (model: Partial<FormalizedModel>) => ReactNode;
  isHorizontal?: boolean;
} & Omit<FormControlProps, 'children'>;

export const Field = ({ children, model, isHorizontal, ...props }: FieldProps) => {
  const { width, inline, fullWidth: _fullWidth } = model;

  let fullWidth = _fullWidth;
  const style: CSSProperties = { ...(props.style || {}) };

  if (width) {
    fullWidth = true;
    let widthValue: string | number = width;
    try {
      widthValue = Number(width);
      // eslint-disable-next-line no-empty
    } catch (_) {}

    style.width = widthValue || width;
  }

  if (isHorizontal) {
    fullWidth = true;
  }

  return (
    <FormControl
      {...props}
      fullWidth={fullWidth}
      className="field"
      style={style}
      sx={{ display: inline ? 'inline-flex' : 'block', mt: 2, mb: 2, ...(props.sx || {}) }}
    >
      {children({ fullWidth })}
    </FormControl>
  );
};
