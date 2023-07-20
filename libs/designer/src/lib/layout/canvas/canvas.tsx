import { Panel, PanelBody, PanelProps } from '@formalizer/components';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Box, IconButton } from '@mui/material';
import { Variants, motion } from 'framer-motion';
import { useContext } from 'react';
import { CollapseTab } from '../../components/collapse-tab/collapse-tab';
import { ContentTabs } from '../../components/content-tabs/content-tabs';
import { UiContext, defaultUiContext } from '../../context/designer-context';
import { ExamplePanel } from '../../panels/example-panel/example-panel';
import { IllustrationPanel } from '../../panels/illustration-panel/illustration-panel';
import { CanvasTab, TabType } from '../../typings/designer-types';
import { OverviewPanel } from '../../panels/overview-panel/overview-panel';

const tabs: TabType<CanvasTab>[] = [
  {
    icon: TableChartIcon,
    tabId: CanvasTab.Illustration,
    Panel: IllustrationPanel,
  },
  {
    icon: RemoveRedEyeIcon,
    tabId: CanvasTab.Example,
    Panel: ExamplePanel,
  },
];

const menuVariants: Variants = {
  expanded: { marginLeft: 0, transition: { duration: 0.3 } },
  collapsed: { marginLeft: 48, transition: { duration: 0.4 } },
};

export const Canvas = (props: PanelProps) => {
  const { activeCanvasTab, updateUi: updateUiContext, canvasCollapsed } = useContext(UiContext);

  const handleCollapseToggle = () => {
    updateUiContext({ canvasCollapsed: !canvasCollapsed });
  };

  const handleTabClick = (tabId: CanvasTab) => {
    updateUiContext({ activeCanvasTab: tabId });
  };

  return (
    <Panel
      {...props}
      size="large"
      elevation={2}
      barPosition="horizontal"
      bar={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.div
            variants={menuVariants}
            initial={defaultUiContext.canvasCollapsed ? 'collapsed' : 'expanded'}
            animate={canvasCollapsed ? 'collapsed' : 'expanded'}
          >
            <IconButton>
              <SaveAsIcon />
            </IconButton>
          </motion.div>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentTabs<CanvasTab>
              direction="horizontal"
              tabs={tabs}
              activeTab={activeCanvasTab}
              onTabClick={handleTabClick}
            />
            <CollapseTab
              direction="vertical"
              onCollapseToggle={handleCollapseToggle}
              collapsed={canvasCollapsed}
            />
          </Box>
        </Box>
      }
    >
      <PanelBody noPadding sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ p: 4, pl: 2 }}>
          <OverviewPanel />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {tabs.map(({ Panel, tabId }) => {
            return tabId === activeCanvasTab ? <Panel key={tabId} /> : null;
          })}
        </Box>
      </PanelBody>
    </Panel>
  );
};
