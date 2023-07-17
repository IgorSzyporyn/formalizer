import { Brand, Panel, PanelBody, PanelProps } from '@formalizer/components';
import { IllustrationPanel } from '../../panels/illustration-panel/illustration-panel';
import { CollapseTab } from '../../components/collapse-tab/collapse-tab';
import { Box } from '@mui/material';
import { CanvasTab, TabType } from '../../typings/designer-types';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useContext } from 'react';
import { DesignerUiContext } from '../../designer-context';
import { ContentTabs } from '../../components/content-tabs/content-tabs';
import { ExamplePanel } from '../../panels/example-panel/example-panel';
import TableChartIcon from '@mui/icons-material/TableChart';

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
          <Brand />
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
