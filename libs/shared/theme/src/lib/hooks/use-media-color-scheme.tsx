import { useEffect, useState } from 'react';

import type { ThemeVariant } from '../../typings/types';

const mediaQuery = '(prefers-color-scheme: dark)';

const getMediaColorScheme = (): ThemeVariant => {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  return 'light';
};

export const useMediaColorScheme = () => {
  const [mediaColorScheme, setMediaColorScheme] =
    useState<ThemeVariant>('light');

  useEffect(() => {
    setMediaColorScheme(getMediaColorScheme());

    if (window.matchMedia) {
      const mediaColorScheme = window.matchMedia(mediaQuery);

      mediaColorScheme.addEventListener('change', () => {
        setMediaColorScheme(getMediaColorScheme());
      });
    }

    return () => {
      const mediaColorScheme = window.matchMedia(mediaQuery);

      mediaColorScheme.removeEventListener('change', () => {
        setMediaColorScheme(getMediaColorScheme());
      });
    };
  }, []);

  return mediaColorScheme;
};
