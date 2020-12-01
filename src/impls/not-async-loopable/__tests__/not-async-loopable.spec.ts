import assert from 'static-type-assert';

import { notAsyncLoopable } from 'iter-tools-es';

declare const value: AsyncIterable<any> | Iterable<any> | number;
if (notAsyncLoopable(value)) {
  assert<number>(value);
}
