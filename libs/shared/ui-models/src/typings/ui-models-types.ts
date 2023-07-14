import { CoreModel, CoreModelType } from '@formalizer/core';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type UiModel = Omit<CoreModel, 'type' | 'name'> & {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & {
    muiName: string;
  };
  title: string;
  description: string;
  group: UiGroupModelType | UiGroupModelType[];
};

export type UiModelInterface = Record<CoreModelType, UiModel>;

export type UiGroupModelType =
  | 'data'
  | 'text'
  | 'date'
  | 'number'
  | 'boolean'
  | 'group';

export type UiGroupModel = {
  type: string;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  items: UiModel[];
  description: string;
};

export type UiGroupModelInterface = Record<UiGroupModelType, UiGroupModel>;
