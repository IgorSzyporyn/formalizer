import {
  ApiValue,
  ClientModel,
  FormalizedModel,
  PropertyModelType,
} from '@formalizer/core';
import { isEqual, uniqueId } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

type State = {
  model?: ClientModel;
  lastId?: string;
  property?: PropertyModelType;
  value?: unknown;
};

export const useListener = (model?: FormalizedModel) => {
  const initialized = useRef(false);
  const uuid = useRef(uniqueId());

  const [listener, setListener] = useState<State>({
    model,
    lastId: model?.id,
  });

  const addListeners = useCallback(
    (id?: string) => {
      model?.addListener?.({
        id: `${uuid.current}.${id}`,
        property: '*',
        callback: ({ model: _model, property, value }) => {
          const newModel = JSON.parse(JSON.stringify(_model));

          if (!isEqual(listener, newModel)) {
            setListener({
              model: newModel,
              lastId: newModel.id,
              property,
              value,
            });
          }
        },
      });
    },
    [model, listener]
  );

  const removeListeners = useCallback(
    (id?: string) => {
      model?.removeListener?.(`${uuid.current}.${id}`);
    },
    [model]
  );

  useEffect(() => {
    removeListeners(listener.lastId);

    if (model?.id && model?.id !== listener.lastId) {
      addListeners(model?.id);

      if (!initialized.current) {
        initialized.current = true;
        const newModel = JSON.parse(JSON.stringify(model));
        setListener({ model: newModel, lastId: newModel.id });
      }
    }

    return () => {
      if (model?.id) {
        removeListeners(model?.id);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);

  return listener;
};
