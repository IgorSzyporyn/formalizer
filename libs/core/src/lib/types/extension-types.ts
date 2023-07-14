import { FormalizedModel, CoreModelType } from './model-types';

export type ComponentMapItem<T> = {
  Component: T;
  properties: Partial<Omit<FormalizedModel, 'type'>> & { type?: string };
  map: PropertyMap;
};

export type ComponentMap<T> = Record<CoreModelType, ComponentMapItem<T>>;

export type PropertyMap = Partial<Record<keyof FormalizedModel, string>>;
