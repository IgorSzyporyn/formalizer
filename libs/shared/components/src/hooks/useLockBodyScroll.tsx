import { useEffect } from 'react';

export const useLockBodyScroll = () => {
  let initial = document.body.style.overflow;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = initial;
    };
  }, []);
};
