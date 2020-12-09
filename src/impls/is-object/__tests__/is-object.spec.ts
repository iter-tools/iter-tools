import assert from 'static-type-assert';

import { isObject } from 'iter-tools-es';

declare const value: unknown;

if (isObject(value)) {
  assert<Record<string, any>>(value);
}
