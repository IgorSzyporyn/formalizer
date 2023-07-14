import { UiGroupModelInterface } from '../typings/ui-models-types';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DatasetIcon from '@mui/icons-material/Dataset';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import FlakyIcon from '@mui/icons-material/Flaky';
import LooksOneIcon from '@mui/icons-material/LooksOne';

export const uiGroupModels: UiGroupModelInterface = {
  text: {
    icon: CalendarMonthIcon,
    items: [],
    title: 'Text',
    type: 'text',
    description: 'asdasd',
  },
  number: {
    icon: LooksOneIcon,
    items: [],
    title: 'Numbers & Digits',
    type: 'number',
    description: 'Numeric only choises',
  },
  boolean: {
    icon: FlakyIcon,
    items: [],
    title: 'Boolean & Binary',
    type: 'boolean',
    description: 'Binary choises',
  },
  date: {
    icon: CalendarMonthIcon,
    items: [],
    title: 'Date & Time',
    type: 'date',
    description: 'Date, month and other time/date based pickers',
  },
  group: {
    icon: GroupWorkIcon,
    items: [],
    title: 'Group',
    type: 'group',
    description: 'Fields that can contain other fields',
  },
  data: {
    icon: DatasetIcon,
    items: [],
    title: 'Data Set & Structures',
    type: 'data',
    description: 'Data structures',
  },
};
