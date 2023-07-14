// import original module declarations
import '@emotion/react';
import { Theme as MuiTheme } from '@mui/material';

// and extend them!
declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    dummy: string;
  }
}
