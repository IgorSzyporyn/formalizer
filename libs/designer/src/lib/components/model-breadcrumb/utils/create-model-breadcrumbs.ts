import { FormalizedModel, FormalizerCore } from '@formalizer/core';
import { ModelBreadcrumb } from '../typings/model-breadcrumb-types';

type CreateModelBreadcrumbsProps = {
  model?: FormalizedModel;
  formalizer?: FormalizerCore;
};

export const createModelBreadcrumbs = ({ model, formalizer }: CreateModelBreadcrumbsProps) => {
  const idArray = model?.id?.split('.') || [];
  let parent = '';

  const breadcrumbs = idArray
    .map((id) => {
      const itemId = parent ? `${parent}.${id}` : id;
      const item = formalizer?.getModel(itemId);
      const returnItem = { title: item?.title, model: item, id: itemId };

      parent = `${itemId}`;

      return (item ? returnItem : null) as ModelBreadcrumb;
    })
    .filter((item) => item !== null);

  return breadcrumbs;
};
