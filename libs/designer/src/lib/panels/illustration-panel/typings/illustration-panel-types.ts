import { FormalizedModel } from '@formalizer/core';

export type IllustrationProps = {
  model: FormalizedModel;
  allowFocus?: boolean;
  allowEdit?: boolean;
  isRoot?: boolean;
  onEditClick?: () => void;
  onFocusClick?: () => void;
};
