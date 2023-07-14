import { useRef, useState, useEffect } from 'react';
import observeRect from '@reach/observe-rect';

import type { RefObject } from 'react';

export type DomRectState = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};

export type DomRectStateKeys = keyof DomRectState;

const getNewStateValue = (
  state: DomRectState,
  rect: DOMRect,
  keys?: DomRectStateKeys[]
) => {
  const newState: Partial<DomRectState> = {};
  const iterateKeys = keys
    ? [...keys]
    : (Object.keys(state).map((k) => k) as DomRectStateKeys[]);

  iterateKeys.forEach((key) => {
    newState[key] = +rect[key].toString();
  });

  return newState;
};

const initialRectState: DomRectState = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
};

export type UseDomRectProps<T extends HTMLElement> = {
  ref: RefObject<T>;
  observe?: boolean;
  props?: DomRectStateKeys[];
};

export const useDomRect = <T extends HTMLElement = HTMLElement>({
  ref,
  observe = true,
  props,
}: UseDomRectProps<T>) => {
  const [rectState, setRectState] = useState<DomRectState>({
    ...initialRectState,
  });
  const observerRef = useRef<ReturnType<typeof observeRect>>();
  const initialRectSet = useRef(false);

  useEffect(() => {
    const cleanup = () => {
      observerRef.current && observerRef.current.unobserve();
    };

    if (!ref.current) {
      return cleanup;
    }

    if (!observerRef.current) {
      observerRef.current = observeRect(ref.current, (rect: DOMRect) => {
        const newState = getNewStateValue(rectState, rect, props);

        setRectState({ ...rectState, ...newState });
      });
    }

    if (!initialRectSet.current) {
      initialRectSet.current = true;
      const rect = ref.current.getBoundingClientRect();

      setRectState({ ...rectState, ...rect.toJSON() });
    }

    observe && observerRef.current.observe();
    return cleanup;
    // eslint-disable-next-line
  }, [setRectState, ref, observe]);

  return rectState;
};

export const useDomRectPure = <T extends HTMLElement = HTMLElement>(
  nodeRef: T | null,
  observe = true
) => {
  const [rectState, setRectState] = useState<DomRectState>({
    ...initialRectState,
  });
  const observerRef = useRef<any>(null);
  const initialRectSet = useRef(false);

  useEffect(() => {
    const cleanup = () => {
      observerRef.current && observerRef.current.unobserve();
    };

    if (!nodeRef) {
      return cleanup;
    }

    if (!observerRef.current) {
      observerRef.current = observeRect(nodeRef, (rect: any) => {
        setRectState({ ...rectState, ...rect.toJSON() });
      });
    }

    if (!initialRectSet.current) {
      initialRectSet.current = true;
      const rect = nodeRef.getBoundingClientRect();

      setRectState({ ...rectState, ...rect.toJSON() });
    }

    observe && observerRef.current.observe();
    return cleanup;
    // eslint-disable-next-line
  }, [setRectState, nodeRef, observe]);

  return rectState;
};
