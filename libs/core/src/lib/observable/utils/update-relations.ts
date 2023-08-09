import { applyPathAndIdToModel } from '../../utils/apply-path-and-id-to-model';
import { CreateObjectObserveHandlerProps } from '../typings/shared-types';
import { updateDependencies } from './update-dependencies';

export const updateRelations = ({
  model,
  ...props
}: CreateObjectObserveHandlerProps): void => {
  const oldItemId = model.id;
  const oldItemPath = model.path;

  applyPathAndIdToModel({ ...props, model });

  updateDependencies(props.modelIdMap, oldItemId, model.id);

  if (props.modelIdMap && props.modelPathMap) {
    delete props.modelIdMap[oldItemId || ''];
    delete props.modelPathMap[oldItemPath || ''];

    props.modelIdMap[model.id || ''] = model;
    props.modelPathMap[model.path || ''] = model;
  }
};
