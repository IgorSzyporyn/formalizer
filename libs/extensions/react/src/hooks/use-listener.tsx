import { FormalizedModel } from '@formalizer/core';
import { uniqueId as _uniqueId } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

type State = {
  property?: keyof FormalizedModel;
  value?: unknown;
};

export const useListener = (model?: FormalizedModel) => {
  const uuid = useRef(_uniqueId());

  const [listener, setListener] = useState<State>({
    property: undefined,
    value: undefined,
  });

  const updateListener = useCallback(
    (state: State) => {
      setListener(state);
    },
    [setListener]
  );

  const addListener = useCallback(
    (id: string) => {
      model?.addListener?.({ id, property: '*', callback: updateListener });
    },
    [updateListener, model]
  );

  useEffect(() => {
    addListener(uuid.current);
  }, [addListener, model]);

  return listener;
};
