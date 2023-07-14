import { useEffect } from 'react';

import type { RefObject } from 'react';

export type UseClickOutsideProps<T extends HTMLElement | null> = {
  ref: RefObject<T> | null;
  handler?: () => void;
  omit?: RefObject<HTMLElement>[];
};

/**
 * ### @woba/UI - useClickOutside
 *
 * Hook that will execute a handler function when user clicks any element
 * not passed as either the main ref or an array of omited refs
 *
 */
export const useClickOutside = <T extends HTMLElement | null>({
  ref,
  handler,
  omit = [],
}: UseClickOutsideProps<T>) => {
  useEffect(() => {
    const handleClickOutside = ({ target }: any) => {
      if (ref && ref.current && !ref.current.contains(target)) {
        const isOmittedRef = omit.some((omitRef) => {
          return omitRef && omitRef.current && omitRef.current.contains(target);
        });

        if (!isOmittedRef) {
          handler && handler();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, omit, ref]);
};

export type UseClickOutsidePureProps<T extends HTMLElement | null> = {
  ref: T | null;
  handler?: () => void;
  omit?: any[];
};

export const useClickOutsidePure = <T extends HTMLElement | null>({
  ref,
  handler,
  omit = [],
}: UseClickOutsidePureProps<T>) => {
  useEffect(() => {
    const handleClickOutside = ({ target }: any) => {
      if (ref && !ref.contains(target)) {
        const isOmittedRef = omit.some((omitRef) => {
          return omitRef && omitRef.current
            ? omitRef.current.contains(target)
            : omitRef && omitRef.contains && omitRef.contains(target);
        });

        if (!isOmittedRef) {
          handler && handler();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, omit, ref]);
};
