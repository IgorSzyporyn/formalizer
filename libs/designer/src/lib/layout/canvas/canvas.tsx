import { Panel, PanelBody, PanelProps } from '@formalizer/components';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Box, IconButton } from '@mui/material';
import { useContext } from 'react';
import { CollapseTab } from '../../components/collapse-tab/collapse-tab';
import { ContentTabs } from '../../components/content-tabs/content-tabs';
import {
  DesignerUiContext,
  defaultDesignerUiContextValue,
} from '../../designer-context';
import { ExamplePanel } from '../../panels/example-panel/example-panel';
import { IllustrationPanel } from '../../panels/illustration-panel/illustration-panel';
import { CanvasTab, TabType } from '../../typings/designer-types';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import * as Styled from './styled';
import { Variants } from 'framer-motion';
import { OverviewPanel } from '../../panels/overview-panel/overview-panel';

const tabs: TabType<CanvasTab>[] = [
  {
    icon: AccountTreeIcon,
    tabId: CanvasTab.Overview,
    Panel: OverviewPanel,
  },
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
  const { activeCanvasTab, updateUiContext, activeModelId, canvasCollapsed } =
    useContext(DesignerUiContext);

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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Styled.Menu
            variants={menuVariants}
            initial={
              defaultDesignerUiContextValue.canvasCollapsed
                ? 'collapsed'
                : 'expanded'
            }
            animate={canvasCollapsed ? 'collapsed' : 'expanded'}
          >
            <IconButton>
              <SaveAsIcon />
            </IconButton>
            <IconButton></IconButton>
            <IconButton></IconButton>
            <IconButton></IconButton>
          </Styled.Menu>
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
      <PanelBody>
        {tabs.map(({ tabId, Panel: TabPanel }) => {
          return tabId === activeCanvasTab ? (
            <TabPanel key={tabId} activeModelId={activeModelId} />
          ) : null;
        })}
      </PanelBody>
    </Panel>
  );
};
