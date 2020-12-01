import assert from 'static-type-assert';

import { isLoopable } from 'iter-tools-es';

declare const value: unknown;

if (isLoopable(value)) {
  for (const _ of value) {
    assert<unknown>(_);
  }
}
