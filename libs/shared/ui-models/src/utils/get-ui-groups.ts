import { cloneDeep } from 'lodash';
import { uiGroupModels } from '../models/group';

export const getUiGroups = () => {
  return cloneDeep(uiGroupModels);
};
