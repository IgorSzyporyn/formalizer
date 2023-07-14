import { ClientModel } from '@formalizer/core';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export const uiPropertyGroups = [
  'core',
  'basic',
  'api',
  'ui',
  'value',
] as const;

export type UiPropertyGroupType = (typeof uiPropertyGroups)[number];

export type UiPropertyGroupModel = {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & {
    muiName: string;
  };
} & ClientModel;

export type UiPropertyGroupInterface = Record<UiPropertyGroupType, ClientModel>;
