import assert from 'static-type-assert';

import { isString } from 'iter-tools-es';

declare const value: any;

if (isString(value)) {
  assert<string>(value);
}
