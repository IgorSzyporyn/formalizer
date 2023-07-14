import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AppsIcon from '@mui/icons-material/Apps';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CallIcon from '@mui/icons-material/Call';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DataArrayIcon from '@mui/icons-material/DataArray';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import GridViewIcon from '@mui/icons-material/GridView';
import PasswordIcon from '@mui/icons-material/Password';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import RadioIcon from '@mui/icons-material/Radio';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TodayIcon from '@mui/icons-material/Today';
import PinIcon from '@mui/icons-material/Pin';

import { UiModelInterface } from '../typings/ui-models-types';

export const uiModels: UiModelInterface = {
  text: {
    icon: TextFieldsIcon,
    title: 'Text',
    description: 'Simple text field',
    group: 'text',
  },
  array: {
    icon: DataArrayIcon,
    title: 'Array',
    description: 'Holds an array of fields for value',
    group: 'data',
  },
  uiArray: {
    icon: DataArrayIcon,
    title: 'UI Array',
    description: 'Holds an array of data for value',
    group: 'data',
  },
  boolean: {
    icon: CheckBoxIcon,
    title: 'Boolean',
    description: 'A simple either or',
    group: 'boolean',
  },
  color: {
    icon: ColorLensIcon,
    title: 'Color',
    description: 'Color description',
    group: 'text',
  },
  date: {
    icon: DateRangeIcon,
    title: 'Date',
    description: 'Date description',
    group: 'date',
  },
  dateTime: {
    icon: CalendarTodayIcon,
    title: 'Date Time',
    description: 'Date Time description',
    group: 'date',
  },
  email: {
    icon: EmailIcon,
    title: 'Email',
    description: 'Email description',
    group: 'text',
  },
  grid: {
    icon: AppsIcon,
    title: 'Grid',
    description: 'Grid description',
    group: 'group',
  },
  group: {
    icon: GridViewIcon,
    title: 'Group',
    description: 'Group description',
    group: 'group',
  },
  options: {
    icon: GridViewIcon,
    title: 'Options',
    description: 'Options description',
    group: 'group',
  },
  option: {
    icon: GridViewIcon,
    title: 'Option',
    description: 'Option description',
    group: 'text',
  },
  longtext: {
    icon: DescriptionIcon,
    title: 'Long Text',
    description: 'Long Text description',
    group: 'text',
  },
  month: {
    icon: CalendarMonthIcon,
    title: 'Month',
    description: 'Month description',
    group: 'date',
  },
  number: {
    icon: PinIcon,
    title: 'Number',
    description: 'Number description',
    group: 'number',
  },
  form: {
    icon: DataObjectIcon,
    title: 'Object',
    description: 'Object description',
    group: 'data',
  },
  object: {
    icon: DataObjectIcon,
    title: 'Object',
    description: 'Object description',
    group: 'data',
  },
  uiObject: {
    icon: DataObjectIcon,
    title: 'UI Object',
    description: 'UI Object description',
    group: 'data',
  },
  password: {
    icon: PasswordIcon,
    title: 'Password',
    description: 'Password description',
    group: 'text',
  },
  radiogroup: {
    icon: RadioIcon,
    title: 'Radio Group',
    description: 'Radio Group description',
    group: 'group',
  },
  radioItem: {
    icon: RadioButtonCheckedIcon,
    title: 'Radio Item',
    description: 'Radio Item description',
    group: ['text', 'number', 'boolean', 'date'],
  },
  root: {
    icon: AccountTreeIcon,
    title: 'Root',
    description: 'Root description',
    group: 'group',
  },
  telephone: {
    icon: CallIcon,
    title: 'Password',
    description: 'Password description',
    group: 'text',
  },
  time: {
    icon: QueryBuilderIcon,
    title: 'Time',
    description: 'Time description',
    group: 'date',
  },
  week: {
    icon: TodayIcon,
    title: 'Week',
    description: 'Week description',
    group: 'date',
  },
};
