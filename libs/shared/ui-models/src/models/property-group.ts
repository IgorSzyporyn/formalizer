import { UiPropertyGroupInterface } from '../typings/ui-property-group-types';
import WebhookIcon from '@mui/icons-material/Webhook';
import JoinRightIcon from '@mui/icons-material/JoinRight';
import BrushIcon from '@mui/icons-material/Brush';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ChatIcon from '@mui/icons-material/Chat';

export const uiPropertyGroups: UiPropertyGroupInterface = {
  core: {
    name: 'core',
    type: 'group',
    title: 'Model Types',
    icon: MonitorHeartIcon,
    items: [],
    fullWidth: true,
    collapsible: true,
    collapsed: false,
  },
  basic: {
    name: 'basic',
    type: 'group',
    title: 'Basic Information',
    description: '',
    icon: ChatIcon,
    items: [],
    fullWidth: true,
    collapsible: true,
    collapsed: true,
  },
  api: {
    name: 'api',
    type: 'group',
    title: 'API Properties',
    description: '',
    icon: WebhookIcon,
    items: [],
    fullWidth: true,
    collapsible: true,
    collapsed: true,
  },
  ui: {
    name: 'ui',
    type: 'group',
    title: 'UI Properties',
    description: '',
    icon: BrushIcon,
    items: [],
    fullWidth: true,
    collapsible: true,
    collapsed: true,
  },
  value: {
    name: 'value',
    type: 'group',
    title: 'Value Properties',
    description: '',
    icon: JoinRightIcon,
    items: [],
    fullWidth: true,
    collapsible: true,
    collapsed: true,
  },
};
