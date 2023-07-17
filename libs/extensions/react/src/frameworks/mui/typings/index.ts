import { TypographyVariant } from '@mui/material';

export type SizeType = 'small' | 'medium' | 'large';

export type TypographyType = {
  title: TypographyVariant;
  hint: TypographyVariant;
  description: TypographyVariant;
};

export type TypographyMap = Record<SizeType, TypographyType>;
