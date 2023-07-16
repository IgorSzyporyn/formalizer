import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export enum UtilityTab {
  Layer = 1,
  Toolbox = 2,
  Properties = 3,
}

export type UtilityTabType = {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  tabId: UtilityTab;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Panel: any;
};
