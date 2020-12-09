import assert from 'static-type-assert';

import { notObject } from 'iter-tools-es';

declare const value: Record<string, any> | number;
if (notObject(value)) {
  assert<number>(value);
}
