import { PropertyModel, PropertyModelType } from '@formalizer/core';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type UiPropertyModel = {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & {
    muiName: string;
  };
} & Partial<PropertyModel>;

export type UiPropertiesInterface = Record<PropertyModelType, UiPropertyModel>;
