import { Panel, PanelBody, PanelProps } from '@formalizer/components';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PreviewIcon from '@mui/icons-material/Preview';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Box, Card, IconButton } from '@mui/material';
import { Variants, motion } from 'framer-motion';
import { useContext } from 'react';
import { CollapseTab } from '../../components/collapse-tab/collapse-tab';
import { ContentTabs } from '../../components/content-tabs/content-tabs';
import { ModelBreadcrumbs } from '../../components/model-breadcrumb/model-breadcrumb';
import { FormalizerContext, UiContext, defaultUiContext } from '../../context/designer-context';
import { ExamplePanel } from '../../panels/example-panel/example-panel';
import { IllustrationPanel } from '../../panels/illustration-panel/illustration-panel';
import { OverviewPanel } from '../../panels/overview-panel/overview-panel';
import { CanvasTab, TabType } from '../../typings/designer-types';

const tabs: TabType<CanvasTab>[] = [
  {
    icon: TableChartIcon,
    tabId: CanvasTab.Illustration,
    Panel: IllustrationPanel,
  },
  {
    icon: PreviewIcon,
    tabId: CanvasTab.Example,
    Panel: ExamplePanel,
  },
];

const menuVariants: Variants = {
  expanded: { marginLeft: 0, transition: { duration: 0.3 } },
  collapsed: { marginLeft: 48, transition: { duration: 0.4 } },
};

export const Canvas = (props: PanelProps) => {
  const formalizer = useContext(FormalizerContext);
  const {
    activeCanvasTab,
    updateUi: updateUiContext,
    canvasCollapsed,
    activeExampleModelId,
  } = useContext(UiContext);

  const rootModel = formalizer?.getRootModel();

  const handleCollapseToggle = () => {
    updateUiContext({ canvasCollapsed: !canvasCollapsed });
  };

  const handleTabClick = (tabId: CanvasTab) => {
    updateUiContext({ activeCanvasTab: tabId });
  };

  const handleHomeButtonClick = () => {
    updateUiContext({ activeExampleModelId: undefined });
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
            <IconButton onClick={handleHomeButtonClick} sx={{ mr: 1 }}>
              <AccountTreeIcon />
            </IconButton>
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
        <Box sx={{ p: 4, pl: 2.5, pr: 2.5 }}>
          <OverviewPanel />
        </Box>
        <Box sx={{ flexGrow: 1 }} style={{ height: '100%' }}>
          <Card style={{ height: '100%' }} sx={{ mt: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                pl: 2.5,
                pr: 2.5,
              }}
              style={{ minHeight: 64 }}
            >
              <Box>
                {activeExampleModelId ? (
                  <ModelBreadcrumbs shift modelId={activeExampleModelId} />
                ) : (
                  <ModelBreadcrumbs modelId={rootModel?.id} />
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {activeExampleModelId && (
                  <ContentTabs<CanvasTab>
                    direction="horizontal"
                    tabs={tabs}
                    activeTab={activeCanvasTab}
                    onTabClick={handleTabClick}
                  />
                )}
                {activeExampleModelId && (
                  <IconButton>
                    <EditNoteIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Box>
              {activeExampleModelId &&
                tabs.map(({ Panel, tabId }) => {
                  return tabId === activeCanvasTab ? <Panel key={tabId} /> : null;
                })}
            </Box>
          </Card>
        </Box>
      </PanelBody>
    </Panel>
  );
};
