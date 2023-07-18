import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export enum UtilityTab {
  Layer = 1,
  Toolbox = 2,
  Properties = 3,
}

export enum CanvasMode {
  Illustration = 'illustration',
  Example = 'example',
  Overview = 'overview',
}

export enum CanvasTab {
  Overview = 1,
  Illustration = 2,
  Example = 3,
}

export type TabType<T> = {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  tabId: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Panel: any;
};
