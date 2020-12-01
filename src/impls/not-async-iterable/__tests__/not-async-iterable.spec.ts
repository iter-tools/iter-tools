import assert from 'static-type-assert';

import { notAsyncIterable } from '@iter-tools/es';

declare const value: AsyncIterable<any> | number;
if (notAsyncIterable(value)) {
  assert<number>(value);
}
