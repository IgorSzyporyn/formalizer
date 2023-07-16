import { LayoutGroup } from 'framer-motion';
import { DesignerUiContext } from '../../../../context';
import { Fragment, useContext } from 'react';
import { Tab } from '../tab/tab';
import * as Styled from './styled';
import { UtilityTabType, UtilityTab } from '../../../../typings/designer-types';

type ContentTabsProps = {
  tabs: UtilityTabType[];
};

export const ContentTabs = ({ tabs }: ContentTabsProps) => {
  const { activeTab, updateUiContext } = useContext(DesignerUiContext);

  const handleTabClick = (id: UtilityTab) => {
    updateUiContext({ activeTab: id });
  };

  return (
    <Styled.UtilityTabs>
      <LayoutGroup>
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
  );
};
