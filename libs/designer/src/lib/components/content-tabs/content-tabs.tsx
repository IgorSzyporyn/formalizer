import { LayoutGroup } from 'framer-motion';
import { uniqueId } from 'lodash';
import { useRef } from 'react';
import { TabType } from '../../typings/designer-types';
import * as Styled from './styled';

type ContentTabsProps<T> = {
  tabs: TabType<T>[];
  activeTab?: T;
  direction?: 'horizontal' | 'vertical';
  onTabClick: (tabId: T) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const ContentTabs = <T extends unknown>({
  tabs,
  activeTab,
  onTabClick,
  direction = 'vertical',
}: ContentTabsProps<T>) => {
  const uuid = useRef(uniqueId('content-tab-animation'));
  const isHorizontal = direction === 'horizontal';

  const handleTabClick = (id: T) => {
    onTabClick(id);
  };

  return (
    <Styled.Wrapper direction={direction}>
      <LayoutGroup>
        {tabs.map(({ tabId, icon }) => {
          const Icon = icon;
          const active = tabId === activeTab;

          return (
            <li key={`content-tabs-${tabId}`}>
              {activeTab === tabId ? (
                <Styled.AnimatedBox layoutId={uuid.current} />
              ) : null}
              <Styled.Tab
                sx={{ mb: isHorizontal ? 0 : 1, mr: isHorizontal ? 1 : 0 }}
                style={{ cursor: active ? 'default' : 'pointer' }}
                size="small"
                onClick={() => {
                  handleTabClick(tabId);
                }}
              >
                <Icon />
              </Styled.Tab>
            </li>
          );
        })}
      </LayoutGroup>
    </Styled.Wrapper>
  );
};
