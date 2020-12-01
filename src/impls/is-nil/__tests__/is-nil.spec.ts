import assert from 'static-type-assert';

import { isNil } from 'iter-tools-es';

declare const value: unknown;

if (isNil(value)) {
  assert<null | undefined>(value);
}
