import { PaletteOptions, createTheme } from '@mui/material';
import { blue, green, grey, purple } from '@mui/material/colors';

const palette: PaletteOptions = {
  mode: 'dark',
  primary: { main: blue[600] },
  secondary: { main: purple[600] },
  neutral: {
    main: grey[700],
    light: grey[800],
    dark: grey[600],
    contrastText: '#fff',
  },
  success: { main: green[600] },
};

export const theme = createTheme({
  palette,
  components: {
    MuiInputBase: {
      variants: [{ props: { size: 'small' }, style: { fontSize: 14 } }],
    },
    MuiInputLabel: {
      variants: [{ props: { size: 'small' }, style: { fontSize: 14 } }],
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
      variants: [
        {
          props: { size: 'small' },
          style: {
            width: 32,
            height: 32,
            '& svg': { fontSize: 18 },
          },
        },
      ],
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
  },
});
