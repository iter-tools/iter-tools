/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$prepend.test.ts#1643837503084
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncPrepend, asyncToArray, asyncWrap } from 'iter-tools-es';

describe('asyncPrepend', () => {
  describe('when source is empty', () => {
    it('yields only the prepended value', async () => {
      expect(await asyncToArray(asyncPrepend('hello', null))).toEqual(['hello']);
      expect(await asyncToArray(asyncPrepend('cruel', undefined))).toEqual(['cruel']);
      expect(await asyncToArray(asyncPrepend('world', asyncWrap([])))).toEqual(['world']);
    });
  });

  it('prepends a value', async () => {
    expect(await asyncToArray(asyncPrepend(1, asyncWrap([2, 3])))).toEqual([1, 2, 3]);
  });
});
