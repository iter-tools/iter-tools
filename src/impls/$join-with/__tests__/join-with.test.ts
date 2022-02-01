/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$join-with.test.ts#1643837503081
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { joinWith } from 'iter-tools-es';
import { wrapDeep, unwrap } from '../../../test/helpers.js';

describe('joinWith', () => {
  it('should join each group with the provided value', () => {
    expect(unwrap(joinWith(null, wrapDeep([[1], [2], [3]])))).toEqual([1, null, 2, null, 3]);
  });

  it('should have two adjacent separators when encountering an empty group', () => {
    expect(unwrap(joinWith(null, wrapDeep([[1], [], [3]])))).toEqual([1, null, null, 3]);
  });

  it('should yield a single separator when joining two empty groups', () => {
    expect(unwrap(joinWith(null, wrapDeep([[], []])))).toEqual([null]);
  });

  it('passes through the empty iterable', () => {
    expect(unwrap(joinWith(0, null))).toEqual([]);
    expect(unwrap(joinWith(0, undefined))).toEqual([]);
    expect(unwrap(joinWith(0, wrapDeep([])))).toEqual([]);
  });

  describe('when source is a string', () => {
    it('warns', () => {
      joinWith(null, 'abc');
      expect(console.warn).callsMatchSnapshot();
    });
  });
});
