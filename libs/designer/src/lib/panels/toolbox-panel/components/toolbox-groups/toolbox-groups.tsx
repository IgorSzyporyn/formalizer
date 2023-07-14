import { UiGroupModel, getUiGroups, getUiModels } from '@formalizer/models';
import { ToolboxGroup } from '../toolbox-group/toolbox-group';
import * as Styled from './styled';

export const ToolboxGroups = () => {
  const uiGroupModels = createGroupedUiModels();

  return (
    <Styled.Wrapper>
      {uiGroupModels.map((uiGroupModel) => {
        return (
          <Styled.Group
            key={`toolbox-groups-${uiGroupModel.type}`}
            sx={{ mb: 1 }}
          >
            <ToolboxGroup
              key={`toolbox-group-${uiGroupModel.type}`}
              uiGroupModel={uiGroupModel}
            />
          </Styled.Group>
        );
      })}
    </Styled.Wrapper>
  );
};

const createGroupedUiModels = () => {
  const uiModels = getUiModels();
  const uiGroupModels = getUiGroups();
  const uiGroupsArray: UiGroupModel[] = [];

  for (const [_, value] of Object.entries(uiModels)) {
    if (typeof value.group === 'string') {
      uiGroupModels[value.group].items.push(value);
    } else if (Array.isArray(value.group)) {
      value.group.forEach((group) => {
        uiGroupModels[group].items.push(value);
      });
    }
  }

  for (const [_, value] of Object.entries(uiGroupModels)) {
    uiGroupsArray.push(value);
  }

  return uiGroupsArray;
};
