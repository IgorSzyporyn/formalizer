import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material';

declare module '@mui/material' {
  export interface Palette extends MuiPalette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions extends MuiPaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
