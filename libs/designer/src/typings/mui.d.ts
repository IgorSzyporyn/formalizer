import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
  ButtonPropsColorOverrides as MuiButtonPropsColorOverrides,
} from '@mui/material';

declare module '@mui/material' {
  export interface Palette extends MuiPalette {
    neutral: Palette['primary'];
    panel: Palette['primary'];
  }

  interface PaletteOptions extends MuiPaletteOptions {
    neutral: PaletteOptions['primary'];
    panel: Palette['primary'];
  }

  interface ButtonPropsColorOverrides extends MuiButtonPropsColorOverrides {
    neutral: true;
    panel: true;
  }
}
