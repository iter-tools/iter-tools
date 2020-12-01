import assert from 'static-type-assert';

import { isNull } from '@iter-tools/es';

declare const value: unknown;

if (isNull(value)) {
  assert<null>(value);
}
