import { Panel, PanelProps } from '@formalizer/components';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import { Fragment } from 'react';
import { UtilityTabType, UtilityTab } from '../../typings/designer-types';
import { CollapseTab } from './components/collapse-tab/collapse-tab';
import { ContentMain } from './components/content-main/content-main';
import { ContentTabs } from './components/content-tabs/content-tabs';
import { LayerPanel } from '../../panels/layer-panel/layer-panel';
import { ToolboxPanel } from '../../panels/toolbox-panel/toolbox-panel';
import { PropertiesPanel } from '../../panels/properties-panel/properties-panel';

const tabs: UtilityTabType[] = [
  {
    icon: LayersIcon,
    tabId: UtilityTab.Layer,
    Panel: LayerPanel,
  },
  {
    icon: HandymanIcon,
    tabId: UtilityTab.Toolbox,
    Panel: ToolboxPanel,
  },
  {
    icon: EditNoteIcon,
    tabId: UtilityTab.Properties,
    Panel: PropertiesPanel,
  },
];

export const Utilities = (props: PanelProps) => {
  return (
    <Panel
      {...props}
      square
      elevation={2}
      barPosition="vertical"
      bar={
        <Fragment key="designer-utilities-bar">
          <CollapseTab />
          <ContentTabs tabs={tabs} />
        </Fragment>
      }
    >
      <ContentMain tabs={tabs} />
    </Panel>
  );
};
