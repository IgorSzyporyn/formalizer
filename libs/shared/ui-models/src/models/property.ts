import ColorLensIcon from '@mui/icons-material/ColorLens';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import WebhookIcon from '@mui/icons-material/Webhook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import BlockIcon from '@mui/icons-material/Block';
import LockIcon from '@mui/icons-material/Lock';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import PaletteIcon from '@mui/icons-material/Palette';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ExpandIcon from '@mui/icons-material/Expand';

import { UiPropertiesInterface } from '../typings/ui-properties-types';

export const uiProperties: UiPropertiesInterface = {
  type: {
    icon: FingerprintIcon,
    fullWidth: true,
    size: 'small',
    group: 'core',
  },
  apiType: {
    icon: WebhookIcon,
    fullWidth: true,
    size: 'small',
    group: 'core',
  },
  icon: {
    icon: EmojiEmotionsIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  size: {
    icon: FitScreenIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  group: {
    icon: WorkspacesIcon,
    fullWidth: true,
    size: 'small',
    group: 'basic',
  },
  uiType: {
    icon: PaletteIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  name: {
    icon: Grid3x3Icon,
    fullWidth: true,
    size: 'small',
    group: 'core',
  },
  hidden: {
    icon: VisibilityOffIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  collapsed: {
    icon: ExpandIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  inline: {
    icon: FirstPageIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  serialize: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'api',
  },
  serializeDelimiter: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'api',
  },
  multiple: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'core',
  },
  defaultValue: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'value',
  },
  emptyValue: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'value',
  },
  initialValue: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'value',
  },
  value: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'value',
  },
  hint: {
    icon: TextSnippetIcon,
    fullWidth: true,
    size: 'small',
    group: 'basic',
  },
  title: {
    icon: FormatQuoteIcon,
    fullWidth: true,
    size: 'small',
    group: 'basic',
  },
  items: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'core',
  },
  columns: {
    icon: ViewWeekIcon,
    fullWidth: true,
    size: 'small',
    group: 'basic',
  },
  options: {
    icon: ColorLensIcon,
    fullWidth: true,
    size: 'small',
    group: 'basic',
  },
  nullable: {
    icon: BlockIcon,
    fullWidth: true,
    size: 'small',
    group: 'api',
  },
  description: {
    icon: DescriptionIcon,
    fullWidth: true,
    size: 'small',
    group: 'basic',
  },
  fullWidth: {
    icon: KeyboardTabIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  readonly: {
    icon: LockIcon,
    fullWidth: true,
    size: 'small',
    group: 'api',
  },
  width: {
    icon: FingerprintIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  direction: {
    icon: FingerprintIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
  layoutOnly: {
    icon: FingerprintIcon,
    fullWidth: true,
    size: 'small',
    group: 'ui',
  },
};
