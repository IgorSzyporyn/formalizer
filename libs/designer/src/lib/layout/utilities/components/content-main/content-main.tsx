import { Variants, motion } from 'framer-motion';
import { useContext } from 'react';
import { DesignerUiContext } from '../../../../context';
import { UtilityTabType } from '../../../../typings/designer-types';
import * as Styled from './styled';

const contentCollapseVariants: Variants = {
  open: { opacity: 1, width: 'auto' },
  closed: { opacity: 0, width: 0 },
};

const panelContentVariants: Variants = {
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay: 0.275, duration: 0.3 },
  },
  exit: {
    opacity: 0.2,
    x: '140%',
    y: 0,
    transition: { duration: 0.6 },
  },
};

type ContentMainProps = {
  tabs: UtilityTabType[];
};

export const ContentMain = ({ tabs }: ContentMainProps) => {
  const { activeTab, utilitiesCollapsed } = useContext(DesignerUiContext);

  return (
    <Styled.ContentMotion
      animate={utilitiesCollapsed ? 'closed' : 'open'}
      variants={contentCollapseVariants}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: 500,
        }}
      >
        {tabs.map(({ tabId, Panel }) => {
          return (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              key={`content-main-item-${tabId}`}
              animate={tabId === activeTab ? 'enter' : 'exit'}
              variants={panelContentVariants}
            >
              <Panel />
            </motion.div>
          );
        })}
      </div>
    </Styled.ContentMotion>
  );
};
