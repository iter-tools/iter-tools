/**
 * @generated-from ./$take.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncTake } from 'iter-tools-es';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers.js';

describe('asyncTake', () => {
  it('takes the first n values', async () => {
    expect(await asyncUnwrap(asyncTake(2, asyncWrap([1, 2, 3])))).toEqual([1, 2]);
  });
  it('completes immediately if requesting 0 (or less) items', async () => {
    expect(await asyncUnwrap(asyncTake(0, asyncWrap([1, 2, 3])))).toEqual([]);
  });
  it('completes immediately after taking the first n values', async () => {
    expect(
      await asyncUnwrap(
        asyncTake(
          2,
          (async function* twoItemsThenNever() {
            yield 1;
            yield 2;
            await new Promise(() => undefined);
            yield 3;
          })(),
        ),
      ),
    ).toEqual([1, 2]);
  });
});
