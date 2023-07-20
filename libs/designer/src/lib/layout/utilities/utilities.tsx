import { Panel } from '@formalizer/components';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import { Variants } from 'framer-motion';
import { Fragment, useContext } from 'react';
import { CollapseTab } from '../../components/collapse-tab/collapse-tab';
import { ContentTabs } from '../../components/content-tabs/content-tabs';
import { UiContext, defaultUiContext } from '../../context/designer-context';
import { LayerPanel } from '../../panels/layer-panel/layer-panel';
import { PropertiesPanel } from '../../panels/properties-panel/properties-panel';
import { ToolboxPanel } from '../../panels/toolbox-panel/toolbox-panel';
import { TabType, UtilityTab } from '../../typings/designer-types';
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
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay: 0.375, duration: 0.375 },
  },
  exit: {
    opacity: 1,
    x: '100%',
    y: 0,
    transition: { duration: 0.375 },
  },
};

export const Utilities = () => {
  const {
    activeUtilityTab: activeTab,
    utilitiesCollapsed,
    utilitiesWidth,
    utilitiesMinWidth,
    updateUi: updateUiContext,
  } = useContext(UiContext);

  const handleTabClick = (tabId: UtilityTab) => {
    updateUiContext({ activeUtilityTab: tabId });
  };

  const handleCollapsedToggle = () => {
    updateUiContext({ utilitiesCollapsed: !utilitiesCollapsed });
  };

  return (
    <Panel
      elevation={2}
      barPosition="vertical"
      sx={{
        height: '100%',
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
      bar={
        <Fragment key="designer-utilities-bar">
          <CollapseTab
            sx={{ mb: 4 }}
            collapsed={utilitiesCollapsed}
            onCollapseToggle={handleCollapsedToggle}
          />
          <ContentTabs<UtilityTab> tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
        </Fragment>
      }
    >
      <Styled.ContentMotion
        animate={utilitiesCollapsed ? 'closed' : 'open'}
        variants={contentCollapseVariants}
      >
        <Styled.ContentMotionInner style={{ width: utilitiesWidth, minWidth: utilitiesMinWidth }}>
          {tabs.map(({ tabId, Panel }) => {
            return (
              <Styled.ContentMotionChild
                key={`content-main-item-${tabId}`}
                animate={tabId === activeTab ? 'enter' : 'exit'}
                initial={tabId === defaultUiContext.activeUtilityTab ? 'enter' : 'exit'}
                exit="exit"
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
