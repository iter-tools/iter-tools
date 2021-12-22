import assert from 'static-type-assert';

import { notArray } from 'iter-tools-es';

declare const value: Array<any> | number;

if (notArray(value)) {
  assert<number>(value);
}
