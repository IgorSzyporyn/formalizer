import { PanelBody, PanelHeader } from '@formalizer/components';
import HandymanIcon from '@mui/icons-material/Handyman';
import { ToolboxGroups } from './components/toolbox-groups/toolbox-groups';

export const ToolboxPanel = () => {
  return (
    <>
      <PanelHeader
        title="Toolbox"
        Icon={HandymanIcon}
        description="Choose among the various types of UI fields and simply drag and drop
      into the form."
      />
      <PanelBody>
        <ToolboxGroups />
      </PanelBody>
    </>
  );
};
