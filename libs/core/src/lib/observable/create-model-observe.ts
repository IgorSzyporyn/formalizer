import { isEqual } from 'lodash';
import {
  FormalizedModelFlat,
  FormalizerCoreOptions,
} from '../types/formalizer-types';
import {
  CoreModelInterface,
  ExtensionInterface,
  FormalizedModel,
  Listener,
  ListenerCallback,
  ListenerProps,
  ClientPropertyType,
  FormalizedPropertyType,
  formalizedPropertyTypes,
} from '../types/model-types';
import { setTypeProperty } from './utils/set-type-property';
import { setValueProperty } from './utils/set-value-property';
import { setItemsProperty } from './utils/set-items-property';
import { CreateObjectObserveHandlerProps } from './utils/shared-types';

type CreateObservableModelProps = {
  customCoreModel?: CoreModelInterface;
  dataParentModel?: FormalizedModel;
  extension?: ExtensionInterface;
  index?: number;
  model: FormalizedModel;
  modelIdMap: FormalizedModelFlat;
  modelPathMap?: FormalizedModelFlat;
  onModelItemChange: (props: ListenerProps) => void;
  options?: FormalizerCoreOptions;
  parent?: FormalizedModel;
  path?: string;
};

export const createModelObserve = ({
  model,
  onModelItemChange,
  ...rest
}: CreateObservableModelProps) => {
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
    delete listenerMap[id];
  };

  model.removeListeners = (listenerIds: string[]) => {
    listenerIds.forEach((id) => {
      delete listenerMap[id];
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
    { model, onModelItemChange, ...rest }
  );

  model = new Proxy(model, handler);

  return model;
};

const createObjectObserveHandler = (
  onChange: ListenerCallback,
  props: CreateObjectObserveHandlerProps
) => {
  return {
    deleteProperty() {
      // Gotta do something about this - set to default value
      // if attemped deleted maybe?
      return true;
    },
    set(
      model: FormalizedModel,
      property: ClientPropertyType | FormalizedPropertyType,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any
    ) {
      const oldValue = model[property];

      if (!isEqual(oldValue, value)) {
        if (property === 'value') {
          setValueProperty({
            ...props,
            model,
            onChange,
            value,
          });
        } else if (property === 'type') {
          setTypeProperty({
            ...props,
            model,
            onChange,
            type: value,
          });
        } else if (property === 'items') {
          setItemsProperty({
            ...props,
            model,
            onChange,
            items: value,
          });
        } else if (
          formalizedPropertyTypes.includes(property as FormalizedPropertyType)
        ) {
          throw Error(`The property ${property} is immutable on ${model.id}`);
        } else {
          model[property] = value as never;
          onChange({ model, property, value });
        }
      }

      return true;
    },
  };
};
