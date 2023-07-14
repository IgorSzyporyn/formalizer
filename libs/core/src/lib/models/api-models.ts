import { isArray, isEmpty } from 'lodash';
import { ApiModelInterface } from '../types/model-types';

export const apiModel: ApiModelInterface = {
  none: {},
  array: {
    // Transform to string
    rawToValue: ({ model, value: _raw }) => {
      const raw = _raw as [] | string | undefined | null;
      let value: string | undefined;

      if (Array.isArray(raw)) {
        const delimiter = model.serializeDelimiter || ',';
        value = raw.join(delimiter);
      } else if (typeof raw === 'string') {
        value = raw;
      } else if (raw === undefined || raw === null) {
        value = undefined;
      }

      return value;
    },
    valueToRaw: ({ model, value: _value, options }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value = _value as any[] | string | undefined | null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let raw: any[] | string | undefined | null;

      if (options?.emptyValues !== false && !value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value = model.emptyValue as any[] | string | undefined | null;
      }

      if (isArray(value)) {
        raw = value;
      } else if (typeof value === 'string') {
        if (!model.serialize) {
          const delimiter = model.serializeDelimiter || ',';
          raw = value.split(delimiter);
        } else {
          raw = value;
        }
      } else if (value === undefined && model.nullable) {
        raw = null;
      } else {
        raw = undefined;
      }

      return raw;
    },
    emptyValue: [],
  },
  boolean: {
    rawToValue: ({ value: _raw }) => {
      const raw = _raw as string | boolean | undefined | null;
      let value = raw as string | undefined;

      if (typeof raw === 'boolean') {
        value = String(raw);
      } else if (typeof raw === 'string') {
        value = raw;
      } else if (raw === undefined || raw === null) {
        value = undefined;
      }

      return value;
    },
    valueToRaw: ({ model, value: _value, options }) => {
      let value = _value as boolean | string | undefined | null;
      let raw: boolean | string | undefined | null;

      if (options?.emptyValues !== false && !value) {
        value = model.emptyValue as boolean | string | undefined | null;
      }

      if (typeof value === 'boolean') {
        raw = value;
      } else if (typeof value === 'string') {
        if (!model.serialize) {
          raw = Boolean(value);
        } else {
          raw = value;
        }
      } else if (value === undefined && model.nullable) {
        raw = null;
      } else {
        raw = undefined;
      }

      return raw;
    },
    emptyValue: false,
  },
  string: {
    rawToValue: ({ value: _raw }) => {
      const raw = _raw as string | undefined | null;
      let value = raw as string | undefined;

      if (typeof raw === 'string') {
        value = String(raw);
      } else if (raw === undefined || raw === null) {
        value = undefined;
      }

      return value;
    },
    valueToRaw: ({ model, value: _value, options }) => {
      let value = _value as string | undefined | null;
      let raw: string | undefined | null;

      if (options?.emptyValues && !value) {
        value = model.emptyValue as string | undefined | null;
      }

      if (typeof value === 'string') {
        raw = value;
      } else if (value === undefined && model.nullable) {
        raw = null;
      } else {
        raw = undefined;
      }

      return raw;
    },
    emptyValue: '',
  },
  number: {
    rawToValue: ({ value: _raw }) => {
      const raw = _raw as string | number | undefined | null;
      let value: string | undefined;

      if (typeof raw === 'number') {
        value = String(raw);
      } else if (typeof raw === 'string') {
        value = raw;
      } else if (raw === undefined || raw === null) {
        value = undefined;
      }

      return value;
    },
    valueToRaw: ({ model, value: _value, options }) => {
      let value = _value as number | string | undefined | null;
      let raw: number | string | undefined | null;

      if (options?.emptyValues !== false && !value) {
        value = model.emptyValue as number | string | undefined | null;
      }

      if (typeof value === 'number') {
        raw = value;
      } else if (typeof value === 'string') {
        if (!model.serialize) {
          raw = Number(value);
        } else {
          raw = value;
        }
      } else if (value === undefined && model.nullable) {
        raw = null;
      } else {
        raw = undefined;
      }

      return raw;
    },
    emptyValue: 0,
  },
  object: {
    rawToValue: ({ value: _raw }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = _raw as string | Record<string, any> | undefined | null;
      let value: string | undefined;

      if (typeof raw === 'object') {
        value = JSON.stringify(raw);
      } else if (typeof raw === 'string') {
        value = raw;
      } else if (raw === undefined || raw === null) {
        value = undefined;
      }

      return value;
    },
    valueToRaw: ({ model, value: _value, options }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value = _value as Record<string, any> | string | undefined | null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let raw: Record<string, any> | string | undefined | null;

      if (options?.emptyValues !== false && (!value || isEmpty(value))) {
        value = model.emptyValue as  // eslint-disable-next-line @typescript-eslint/no-explicit-any
          | Record<string, any>
          | string
          | undefined
          | null;
      }

      if (isArray(value)) {
        raw = value;
      } else if (typeof value === 'string') {
        raw = model.serialize ? value : JSON.parse(value);
      } else if (!value && model.nullable) {
        raw = null;
      } else {
        raw = undefined;
      }

      return raw;
    },
    emptyValue: {},
  },
};
