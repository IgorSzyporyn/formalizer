import { UiGroupModel, getUiGroups, getUiModels } from '@formalizer/models';
import { Box } from '@mui/material';
import { ToolboxGroup } from '../toolbox-group/toolbox-group';

export const ToolboxGroups = () => {
  const uiGroupModels = createGroupedUiModels();

  return (
    <Box>
      {uiGroupModels.map((uiGroupModel) => {
        return (
          <Box key={`toolbox-groups-${uiGroupModel.type}`} sx={{ mb: 1 }}>
            <ToolboxGroup
              key={`toolbox-group-${uiGroupModel.type}`}
              uiGroupModel={uiGroupModel}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const createGroupedUiModels = () => {
  const uiModels = getUiModels();
  const uiGroupModels = getUiGroups();
  const uiGroupsArray: UiGroupModel[] = [];

  for (const value of Object.values(uiModels)) {
    if (typeof value.group === 'string') {
      uiGroupModels[value.group].items.push(value);
    } else if (Array.isArray(value.group)) {
      value.group.forEach((group) => {
        uiGroupModels[group].items.push(value);
      });
    }
  }

  for (const value of Object.values(uiGroupModels)) {
    uiGroupsArray.push(value);
  }

  return uiGroupsArray;
};
