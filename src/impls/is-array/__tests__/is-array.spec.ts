import assert from 'static-type-assert';

import { isArray } from 'iter-tools-es';

declare const value: any;

if (isArray(value)) {
  assert<Array<unknown>>(value);
}
