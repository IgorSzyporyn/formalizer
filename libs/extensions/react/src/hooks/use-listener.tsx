import { ClientPropertyType, FormalizedModel } from '@formalizer/core';
import { uniqueId as _uniqueId } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

const createId = (modelId: string, id?: string) => {
  return _uniqueId(`${modelId}.${id}.`);
};

type State = {
  property?: keyof FormalizedModel;
  value?: unknown;
};

type UseListenerProps = {
  id?: string;
  model?: FormalizedModel;
  property?: ClientPropertyType | ClientPropertyType[];
};

export const useListener = ({ model, id, property: _property }: UseListenerProps) => {
  const uuid = useRef(createId(model?.id || '', id));

  const [listener, setListener] = useState<State | undefined>();

  const updateHook = useCallback(
    (state: State) => {
      setListener(state);
    },
    [setListener]
  );

  const addListener = useCallback(
    (_id: string) => {
      const properties = Array.isArray(_property) ? _property : [_property || '*'];

      properties.forEach((property) => {
        model?.addListener?.({
          id: _id,
          property,
          callback: updateHook,
        });
      });
    },
    [_property, model, updateHook]
  );

  const removeListener = useCallback(
    (_id: string) => {
      model?.removeListener?.(_id);
    },
    [model]
  );

  useEffect(() => {
    const _id = uuid.current;

    addListener(_id);

    return () => {
      removeListener(_id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return listener;
};
