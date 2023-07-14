import { Panel } from '@formalizer/components';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HandymanIcon from '@mui/icons-material/Handyman';
import LayersIcon from '@mui/icons-material/Layers';
import { IconButton } from '@mui/material';
import { LayoutGroup, Variants } from 'framer-motion';
import { Fragment, useContext } from 'react';
import { DesignerContext, DesignerUiContext, UtilityTab } from '../../context';
import { LayerPanel } from '../../panels/layer-panel/layer-panel';
import { PropertiesPanel } from '../../panels/properties-panel/properties-panel';
import { ToolboxPanel } from '../../panels/toolbox-panel/toolbox-panel';
import { Tab } from './components/tab/tab';
import * as Styled from './styled';

const tabs = [
  {
    icon: LayersIcon,
    tabId: UtilityTab.Layer,
  },
  {
    icon: HandymanIcon,
    tabId: UtilityTab.Toolbox,
  },
  {
    icon: EditNoteIcon,
    tabId: UtilityTab.Properties,
  },
];

const contentCollapseVariants: Variants = {
  open: { opacity: 1, width: 'auto' },
  closed: { opacity: 0, width: 0 },
};

const iconCollapseVariants: Variants = {
  open: { rotateY: 0 },
  closed: { rotateY: 180 },
};

const panelContentVariants: Variants = {
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 28 },
  },
  exit: {
    opacity: 0,
    x: '100%',
    y: 0,
  },
};

type UtilitiesProps = {
  collapsed?: boolean;
  id?: string;
};

export const Utilities = ({ collapsed: _collapsed, id }: UtilitiesProps) => {
  const {
    utilities: { activeTab, collapsed },
    updateUiContext,
  } = useContext(DesignerUiContext);

  const { formalizer } = useContext(DesignerContext);
  const model = formalizer?.getModel(id);

  const handleTabClick = (id: UtilityTab) => {
    updateUiContext({ utilities: { activeTab: id, collapsed } });
  };

  const handleItemEditCancel = () => {
    // setActiveId(model?.id);
  };

  const handleCollapseToggle = () => {
    updateUiContext({ utilities: { activeTab, collapsed: !collapsed } });
  };

  return (
    <Panel
      sx={{ height: '100%' }}
      square
      elevation={2}
      barPosition="vertical"
      bar={
        <Fragment key="designer-utilities-bar">
          <Styled.CollapseIcon
            animate={collapsed ? 'closed' : 'open'}
            variants={iconCollapseVariants}
          >
            <IconButton onClick={handleCollapseToggle}>
              <DoubleArrowIcon />
            </IconButton>
          </Styled.CollapseIcon>
          <Styled.UtilityTabs>
            <LayoutGroup id="utilities-utility-tabs">
              {tabs.map(({ tabId, icon }) => (
                <Fragment key={`utilities-utility-tabs-${tabId}`}>
                  {activeTab === tabId ? (
                    <Styled.AnimatedBox layoutId="utilities-utility-tab" />
                  ) : null}
                  <Tab
                    key={`utilities-tabs-${tabId}`}
                    tabId={tabId}
                    icon={icon}
                    active={activeTab === tabId}
                    onClick={handleTabClick}
                  />
                </Fragment>
              ))}
            </LayoutGroup>
          </Styled.UtilityTabs>
        </Fragment>
      }
    >
      <Styled.ContentMotion
        animate={collapsed ? 'closed' : 'open'}
        variants={contentCollapseVariants}
      >
        <Styled.Content>
          <Styled.AnimatedContentPanel
            key="layer-panel"
            initial="enter"
            variants={panelContentVariants}
            animate={activeTab === UtilityTab.Layer ? 'enter' : 'exit'}
          >
            <LayerPanel model={model} />
          </Styled.AnimatedContentPanel>
          <Styled.AnimatedContentPanel
            key="toolbox-panel"
            initial="exit"
            variants={panelContentVariants}
            animate={activeTab === UtilityTab.Toolbox ? 'enter' : 'exit'}
          >
            <ToolboxPanel />
          </Styled.AnimatedContentPanel>
          <Styled.AnimatedContentPanel
            key="properties-panel"
            initial="exit"
            variants={panelContentVariants}
            animate={activeTab === UtilityTab.Properties ? 'enter' : 'exit'}
          >
            <PropertiesPanel onCancelItemEdit={handleItemEditCancel} />
          </Styled.AnimatedContentPanel>
        </Styled.Content>
      </Styled.ContentMotion>
    </Panel>
  );
};
