import assert from 'static-type-assert';

import { notString } from 'iter-tools-es';

declare const value: string | number;

if (notString(value)) {
  assert<number>(value);
}
