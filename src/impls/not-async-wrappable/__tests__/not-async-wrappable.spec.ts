import assert from 'static-type-assert';

import { notAsyncWrappable } from '@iter-tools/es';

declare const value: AsyncIterable<any> | Iterable<any> | null | undefined | number;
if (notAsyncWrappable(value)) {
  assert<number>(value);
}
