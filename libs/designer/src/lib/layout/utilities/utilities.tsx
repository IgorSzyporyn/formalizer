import EditNoteIcon from '@mui/icons-material/EditNote';
import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { CollapseTab } from '../../components/collapse-tab/collapse-tab';
import { ContentTabs } from '../../components/content-tabs/content-tabs';
import { UiContext, defaultUiContext } from '../../context/designer-context';
import { LayerPanel } from '../../panels/layer-panel/layer-panel';
import { PropertiesPanel } from '../../panels/properties-panel/properties-panel';
import { ToolboxPanel } from '../../panels/toolbox-panel/toolbox-panel';
import { TabType, UtilityTab } from '../../typings/designer-types';

const COLLAPSED_WIDTH = 44;
const EXPANDED_WIDTH = 500;

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

export const Utilities = () => {
  const { activeUtilityTab: defaultActiveTab } = defaultUiContext;
  const {
    activeUtilityTab: activeTab,
    utilitiesCollapsed,
    updateUi: updateUiContext,
  } = useContext(UiContext);

  const handleTabClick = (tabId: UtilityTab) => {
    updateUiContext({ activeUtilityTab: tabId });
  };

  const handleCollapsedToggle = () => {
    updateUiContext({ utilitiesCollapsed: !utilitiesCollapsed });
  };

  return (
    <motion.div
      style={{ position: 'relative', height: '100vh', display: 'flex' }}
      animate={utilitiesCollapsed ? 'utilitiesCollapsed' : 'utilitiesExpanded'}
      initial={utilitiesCollapsed ? 'utilitiesCollapsed' : 'utilitiesExpanded'}
      variants={{
        utilitiesExpanded: { width: EXPANDED_WIDTH },
        utilitiesCollapsed: { width: COLLAPSED_WIDTH },
      }}
    >
      <Box
        sx={{
          minWidth: COLLAPSED_WIDTH,
          height: '100%',
          bgcolor: 'panel.light',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 4,
        }}
      >
        <CollapseTab
          sx={{ mb: 4 }}
          collapsed={utilitiesCollapsed}
          onCollapseToggle={handleCollapsedToggle}
        />
        <ContentTabs<UtilityTab>
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </Box>
      <Box
        sx={{
          height: '100%',
          flexGrow: 1,
          bgcolor: 'panel.main',
          position: 'relative',
        }}
      >
        {tabs.map(({ tabId, Panel }) => {
          const animate = tabId === activeTab ? 'enter' : 'exit';
          const initial = tabId === defaultActiveTab ? 'enter' : 'exit';

          return (
            <motion.div
              key={`content-main-item-${tabId}`}
              animate={animate}
              initial={initial}
              exit="exit"
              variants={{
                enter: {
                  x: 0,
                  y: 0,
                  transition: { delay: 0.375, duration: 0.375 },
                },
                exit: {
                  x: '100%',
                  y: 0,
                  transition: { duration: 0.375 },
                },
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: EXPANDED_WIDTH - COLLAPSED_WIDTH,
                overflowY: 'auto',
                height: '100%',
              }}
            >
              <Panel />
            </motion.div>
          );
        })}
      </Box>
    </motion.div>
  );
};
