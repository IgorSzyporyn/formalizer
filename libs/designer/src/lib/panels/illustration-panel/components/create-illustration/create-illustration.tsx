import { FormalizedModel } from '@formalizer/core';
import { illustrationModels } from '../../models/illustration-panel-model';
import { useContext } from 'react';
import { UiContext } from '../../../../context/designer-context';
import { UtilityTab } from '../../../../typings/designer-types';
import { useListener } from '@formalizer/react';

type CreateIllustrationProps = {
  model: FormalizedModel;
  allowFocus?: boolean;
  allowEdit?: boolean;
  isRoot?: boolean;
};

export const CreateIllustration = ({
  model,
  allowFocus,
  allowEdit,
  isRoot,
}: CreateIllustrationProps) => {
  const { updateUi } = useContext(UiContext);
  let Component;

  const handleEditClick = () => {
    updateUi({
      activeEditModelId: model.id,
      utilitiesCollapsed: false,
      activeUtilityTab: UtilityTab.Properties,
    });
  };

  const handleFocusClick = () => {
    updateUi({ activeFocusModelId: model.id });
  };

  if (model) {
    const illustrationModel = illustrationModels[model?.type];
    Component = illustrationModel.Component;
  }

  useListener({ model, id: 'create-illustration' });

  return Component ? (
    <Component
      model={model}
      onEditClick={handleEditClick}
      onFocusClick={handleFocusClick}
      allowFocus={allowFocus}
      allowEdit={allowEdit}
      isRoot={isRoot}
    />
  ) : null;
};
