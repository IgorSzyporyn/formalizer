import { cloneDeep } from 'lodash';
import { uiPropertyGroups as _uiPropertyGroups } from '../models/property-group';

export const getUiPropertyGroups = () => {
  const uiPropertyGroups = cloneDeep(_uiPropertyGroups);

  return uiPropertyGroups;
};
