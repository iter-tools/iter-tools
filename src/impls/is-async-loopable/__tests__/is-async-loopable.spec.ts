import assert from 'static-type-assert';

import { isAsyncLoopable } from '@iter-tools/es';

declare const value: unknown;

(async function test() {
  if (isAsyncLoopable(value)) {
    for await (const _ of value) {
      assert<unknown>(_);
    }
  }
})();
