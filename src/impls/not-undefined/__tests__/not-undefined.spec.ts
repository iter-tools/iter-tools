import assert from 'static-type-assert';

import { notUndefined } from 'iter-tools-es';

declare const value: undefined | number;
if (notUndefined(value)) {
  assert<number>(value);
}
