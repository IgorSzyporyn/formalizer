import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useContext } from 'react';
import { FormalizerContext, UiContext } from '../../context/designer-context';
import { ModelCardHeader } from '../model-card-header/model-card-header';
import * as Styled from './styled';
import { createModelBreadcrumbs } from './utils/create-model-breadcrumbs';

type ModelBreadcrumbsProps = {
  shift?: boolean;
  modelId?: string;
};

export const ModelBreadcrumbs = ({ shift, modelId }: ModelBreadcrumbsProps) => {
  const formalizer = useContext(FormalizerContext);
  const { updateUi } = useContext(UiContext);

  const model = formalizer?.getModel?.(modelId);
  const breadcrumbs = createModelBreadcrumbs({ model, formalizer });

  if (shift) {
    breadcrumbs.shift();
  }

  const handleBreadcrumbClick = (id: string) => {
    updateUi({ activeExampleModelId: id });
  };

  return (
    <Styled.Wrapper>
      {breadcrumbs.map((breadcrumb) => {
        return (
          <Styled.Breadcrumb
            key={breadcrumb.id}
            onClick={() => handleBreadcrumbClick(breadcrumb.id)}
          >
            <ModelCardHeader noSubheader size="small" modelId={breadcrumb.id} sx={{ p: 0 }} />
            <ChevronRightIcon style={{ fontSize: '1.25rem' }} sx={{ mr: 1, ml: 1 }} />
          </Styled.Breadcrumb>
        );
      })}
    </Styled.Wrapper>
  );
};
