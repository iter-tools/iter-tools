import assert from 'static-type-assert';

import { notNil } from '@iter-tools/es';

declare const value: null | undefined | number;
if (notNil(value)) {
  assert<number>(value);
}
