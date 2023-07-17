import { Panel } from '@formalizer/components';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import { Variants } from 'framer-motion';
import { Fragment, useContext } from 'react';
import { DesignerUiContext } from '../../designer-context';
import { LayerPanel } from '../../panels/layer-panel/layer-panel';
import { PropertiesPanel } from '../../panels/properties-panel/properties-panel';
import { ToolboxPanel } from '../../panels/toolbox-panel/toolbox-panel';
import { UtilityTab, TabType } from '../../typings/designer-types';
import { CollapseTab } from '../../components/collapse-tab/collapse-tab';
import { ContentTabs } from '../../components/content-tabs/content-tabs';
import * as Styled from './styled';

const tabs: TabType<UtilityTab>[] = [
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

const contentCollapseVariants: Variants = {
  open: { opacity: 1, width: 'auto' },
  closed: { opacity: 0, width: 0 },
};

const panelContentVariants: Variants = {
  initial: {
    opacity: 0,
    x: '-100%',
    y: 0,
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.375, type: 'spring' },
  },
  exit: {
    opacity: 0,
    x: '100%',
    y: 0,
    transition: { duration: 0.275 },
  },
};

export const Utilities = () => {
  const {
    activeUtilityTab: activeTab,
    utilitiesCollapsed,
    updateUiContext,
  } = useContext(DesignerUiContext);

  const handleTabClick = (tabId: UtilityTab) => {
    updateUiContext({ activeUtilityTab: tabId });
  };

  const handleCollapsedToggle = () => {
    updateUiContext({ utilitiesCollapsed: !utilitiesCollapsed });
  };

  return (
    <Panel
      square
      elevation={2}
      barPosition="vertical"
      sx={{ height: '100%' }}
      bar={
        <Fragment key="designer-utilities-bar">
          <CollapseTab
            sx={{ mb: 6 }}
            collapsed={utilitiesCollapsed}
            onCollapseToggle={handleCollapsedToggle}
          />
          <ContentTabs<UtilityTab>
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={handleTabClick}
          />
        </Fragment>
      }
    >
      <Styled.ContentMotion
        animate={utilitiesCollapsed ? 'closed' : 'open'}
        variants={contentCollapseVariants}
      >
        <Styled.ContentMotionInner>
          {tabs.map(({ tabId, Panel }) => {
            return (
              <Styled.ContentMotionChild
                key={`content-main-item-${tabId}`}
                initial="initial"
                animate={tabId === activeTab ? 'enter' : 'exit'}
                variants={panelContentVariants}
              >
                <Panel />
              </Styled.ContentMotionChild>
            );
          })}
        </Styled.ContentMotionInner>
      </Styled.ContentMotion>
    </Panel>
  );
};
