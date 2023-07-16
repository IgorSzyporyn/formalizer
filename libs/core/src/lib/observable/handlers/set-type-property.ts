import { CoreModelType, ListenerCallback } from '../../typings/model-types';
import { isCoreType } from '../../utils/is-core-type';
import { addDefaultProperties } from '../utils/add-default-properties';
import { removePreventedProperties } from '../utils/remove-prevented-properties';
import { CreateObjectObserveHandlerProps } from '../typings/shared-types';
import { transformCoreProperties } from '../utils/transform-core-properties';

type SetTypeProperty = {
  type: CoreModelType;
  onChange: ListenerCallback;
} & CreateObjectObserveHandlerProps;

export const setTypeProperty = ({
  model,
  type,
  onChange,
  ...rest
}: SetTypeProperty) => {
  const allowedType = isCoreType(type);

  // Set value for type if allowed, if not - then complain in console.warn
  if (allowedType) {
    model.type = type;

    removePreventedProperties({ model, onChange, type });
    addDefaultProperties({ model, onChange, type });
    transformCoreProperties({ model, type, onChange, ...rest });

    onChange({ model, property: 'type', value: type });
  } else {
    console.warn(
      `The invalid type: "${type}" was attemped set on the model: "${model.id}"`
    );
  }
};
