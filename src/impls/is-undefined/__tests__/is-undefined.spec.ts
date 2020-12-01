import assert from 'static-type-assert';

import { isUndefined } from 'iter-tools-es';

declare const value: unknown;

if (isUndefined(value)) {
  assert<undefined>(value);
}
