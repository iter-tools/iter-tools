import assert from 'static-type-assert';

import { notWrappable } from 'iter-tools-es';

declare const value: Iterable<any> | undefined | null | number;
if (notWrappable(value)) {
  assert<number>(value);
}
