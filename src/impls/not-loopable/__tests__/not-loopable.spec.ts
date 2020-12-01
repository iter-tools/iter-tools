import assert from 'static-type-assert';

import { notLoopable } from '@iter-tools/es';

declare const value: Iterable<any> | number;
if (notLoopable(value)) {
  assert<number>(value);
}
