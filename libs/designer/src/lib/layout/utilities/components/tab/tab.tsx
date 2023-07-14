import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import * as Styled from './styled';
import { UtilityTab } from '../../../../context';

type TabProps = {
  tabId: UtilityTab;
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  active?: boolean;
  onClick: (id: UtilityTab) => void;
};

export const Tab = ({ icon, active, onClick, tabId }: TabProps) => {
  const Icon = icon;

  const handleClick = () => {
    onClick(tabId);
  };

  return (
    <Styled.Wrapper
      style={{ cursor: active ? 'default' : 'pointer' }}
      tabid={tabId}
      size="small"
      onClick={handleClick}
    >
      <Icon />
    </Styled.Wrapper>
  );
};
