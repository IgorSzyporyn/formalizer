import { isEqual } from 'lodash';
import {
  FormalizerModelIdMap,
  FormalizerOptions,
} from '../types/formalizer-types';
import {
  FormalizedModel,
  Listener,
  ListenerCallback,
  ListenerProps,
  PropertyModelType,
} from '../types/model-types';
import { setTypeProperty } from './utils/set-type-property';
import { setValueProperty } from './utils/set-value-property';

export const createModelObserve = (
  model: FormalizedModel,
  modelIdMap: FormalizerModelIdMap,
  onModelItemChange?: (props: ListenerProps) => void,
  options?: FormalizerOptions
) => {
  const listenerMap: Record<string, Listener> = {};

  model.listeners?.forEach((listener) => {
    if (!listenerMap[listener.id]) {
      listenerMap[listener.id] = listener;
    }
  });

  model.addListener = (listener) => {
    if (!listenerMap[listener.id]) {
      listenerMap[listener.id] = listener;
    }
  };

  model.removeListener = (id: string) => {
    if (!listenerMap[id]) {
      delete listenerMap[id];
    }
  };

  model.removeListeners = (listenerIds: string[]) => {
    listenerIds.forEach((id) => {
      if (!listenerMap[id]) {
        delete listenerMap[id];
      }
    });
  };

  const handler = createObjectObserveHandler(
    (args) => {
      setTimeout(() => {
        onModelItemChange?.(args);

        for (const [_, listener] of Object.entries(listenerMap)) {
          if (
            args.property === listener.property ||
            listener.property === '*'
          ) {
            listener.callback(args);
          }
        }
      }, 0);
    },
    modelIdMap,
    options
  );

  model = new Proxy(model, handler);

  return model;
};

const createObjectObserveHandler = (
  onChange: ListenerCallback,
  modelIdMap: FormalizerModelIdMap,
  options?: FormalizerOptions
) => {
  return {
    set(
      model: FormalizedModel,
      property: PropertyModelType,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any
    ) {
      const oldValue = model[property];

      if (!isEqual(oldValue, value)) {
        if (property === 'value') {
          setValueProperty({ model, modelIdMap, onChange, value, options });
        } else if (property === 'type') {
          setTypeProperty({
            model,
            modelIdMap,
            onChange,
            type: value,
            options,
          });
        } else {
          model[property] = value as never;
          onChange({ model, property, value });
        }
      }

      return true;
    },
  };
};
