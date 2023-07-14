import { useMemo } from 'react';

let idCounter = 0;

export const useUniqueId = (prefix: string): string => {
  const id = useMemo(() => idCounter++, []);
  return `${prefix}${id}`;
};
