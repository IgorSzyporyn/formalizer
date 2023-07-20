import { PanelBody, PanelHeader } from '@formalizer/components';
import HandymanIcon from '@mui/icons-material/Handyman';
import { ToolboxGroups } from './components/toolbox-groups/toolbox-groups';
import { HTMLAttributes } from 'react';

type ToolboxPanelProps = HTMLAttributes<HTMLDivElement>;

export const ToolboxPanel = ({ ...props }: ToolboxPanelProps) => {
  return (
    <div {...props}>
      <PanelHeader
        title="Toolbox"
        Icon={HandymanIcon}
        description="Choose among the various types of UI fields and simply drag and drop into the form."
      />
      <PanelBody>
        <ToolboxGroups />
      </PanelBody>
    </div>
  );
};
