import { coreModelTypes } from '../typings/model-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isCoreType = (type?: any) => {
  const _isCoreType = coreModelTypes.includes(type);

  return _isCoreType;
};
