import { isEqual } from 'lodash';
import {
  FormalizedModelFlat,
  FormalizerCoreConfig,
  FormalizerCoreOptions,
} from '../typings/formalizer-types';
import {
  FormalizedModel,
  Listener,
  ListenerCallback,
  ListenerProps,
} from '../typings/model-types';
import { setItemsProperty } from './handlers/set-items-property';
import { setTypeProperty } from './handlers/set-type-property';
import { setValueProperty } from './handlers/set-value-property';
import { CreateObjectObserveHandlerProps } from './typings/shared-types';

type CreateObservableModelProps = {
  config: FormalizerCoreConfig;
  index?: number;
  model: FormalizedModel;
  modelIdMap: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  onModelItemChange: (props: ListenerProps) => void;
  options?: FormalizerCoreOptions;
  path?: string;
};

export const addListener = (
  listener: Listener,
  listenerMap: Record<string, Listener>
) => {
  if (!listenerMap[listener.id]) {
    listenerMap[listener.id] = listener;
  }
};

export const removeListener = (
  id: string,
  listenerMap: Record<string, Listener>
) => {
  delete listenerMap[id];
};

export const removeListeners = (
  listenerIds: string[],
  listenerMap: Record<string, Listener>
) => {
  listenerIds.forEach((id) => {
    removeListener(id, listenerMap);
  });
};

export const createModelObserve = ({
  model,
  onModelItemChange,
  ...rest
}: CreateObservableModelProps) => {
  const listenerMap: Record<string, Listener> = {};

  model.listeners?.forEach((listener) => {
    addListener(listener, listenerMap);
  });

  model.addListener = (listener) => {
    addListener(listener, listenerMap);
  };

  model.removeListener = (id: string) => {
    removeListener(id, listenerMap);
  };

  model.removeListeners = (listenerIds: string[]) => {
    removeListeners(listenerIds, listenerMap);
  };

  const handler = createObjectObserveHandler(
    (args) => {
      onModelItemChange?.(args);

      for (const listener of Object.values(listenerMap)) {
        if (args.property === listener.property || listener.property === '*') {
          listener.callback(args);
        }
      }
    },
    { model, onModelItemChange, ...rest }
  );

  model = new Proxy(model, handler);

  return model;
};

const propertyHandlers = {
  value: setValueProperty,
  type: setTypeProperty,
  items: setItemsProperty,
};

const createObjectObserveHandler = (
  onChange: ListenerCallback,
  props: CreateObjectObserveHandlerProps
) => {
  return {
    set(
      model: FormalizedModel,
      property: keyof FormalizedModel,
      value: unknown
    ) {
      const oldValue = model[property];

      if (!isEqual(oldValue, value)) {
        console.log('setter', property, value, model.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handlers = propertyHandlers as any;
        const handler = handlers[property];
        if (handler) {
          handler({
            ...props,
            model,
            onChange,
            [property]: value,
          });
        } else {
          model[property] = value;
          onChange({ model, property, value });
        }
      }

      return true;
    },
  };
};
