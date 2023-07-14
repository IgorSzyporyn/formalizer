import {
  ClientModel,
  CoreModelType,
  FormalizedModel,
  PropertyModelType,
} from '@formalizer/core';
import {
  UiPropertyGroupType,
  getUiModels,
  getUiProperties,
  getUiPropertyGroups,
} from '@formalizer/models';
import { cloneDeep } from 'lodash';

type CreatePropertiesModelProps = {
  model?: FormalizedModel;
};

export const createPropertiesClientModel = ({
  model,
}: CreatePropertiesModelProps) => {
  const propertiesModel: ClientModel = {
    name: `${model?.name}`,
    type: 'root',
    items: [],
  };

  if (model) {
    const type = model?.type;

    const uiModels = getUiModels();
    const uiPropertiesModel = getUiProperties();
    const uiPropertiesGroupModel = getUiPropertyGroups();

    const uiModel = uiModels[type];

    for (const [_property, _value] of Object.entries(uiPropertiesModel)) {
      const property = _property as PropertyModelType;
      const uiPropertyType = _value.type as CoreModelType;
      const uiPropertyGroupType = _value.group as UiPropertyGroupType;

      const uiGroupModel = uiPropertiesGroupModel[uiPropertyGroupType];

      const allowedProperty =
        !uiModel.preventedProperties?.includes(property) && !_value.readonly;

      const typeOverride = _value?.inheritType ? model.type : uiPropertyType;

      if (allowedProperty && uiPropertyType) {
        const propertyModelItem = {
          ..._value,
          value: cloneDeep(model[property]),
          type: typeOverride,
          name: property,
        };

        if (uiGroupModel) {
          uiGroupModel.items?.push(propertyModelItem);
        } else {
          propertiesModel.items?.push(propertyModelItem);
        }
      }
    }

    for (const [_, _value] of Object.entries(uiPropertiesGroupModel)) {
      propertiesModel.items?.push(_value);
    }
  }

  if (propertiesModel?.items && propertiesModel.items.length) {
    propertiesModel.items = propertiesModel.items?.filter((item) => {
      return item.items && item.items.length > 0;
    });
  }

  return propertiesModel;
};
