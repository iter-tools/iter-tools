import assert from 'static-type-assert';

import { notIterable } from 'iter-tools-es';

declare const value: Iterable<any> | number;
if (notIterable(value)) {
  assert<number>(value);
}
