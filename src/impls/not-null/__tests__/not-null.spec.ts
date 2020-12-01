import assert from 'static-type-assert';

import { notNull } from '@iter-tools/es';

declare const value: null | number;
if (notNull(value)) {
  assert<number>(value);
}
