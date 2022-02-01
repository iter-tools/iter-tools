/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$take.test.ts#1643837503110
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
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
            throw new Error('Should not yield after `2`');
          })(),
        ),
      ),
    ).toEqual([1, 2]);
  });
});
