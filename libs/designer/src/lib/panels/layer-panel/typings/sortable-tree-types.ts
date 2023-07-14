import type { UniqueIdentifier } from '@dnd-kit/core';
import { CoreModelType } from '@formalizer/core';
import type { MutableRefObject } from 'react';

export type TreeItem = {
  id: UniqueIdentifier;
  modelId: string;
  collapsed?: boolean;
  editing?: boolean;
  items: TreeItem[];
  accepts?: CoreModelType[];
  type?: CoreModelType;
};

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;
