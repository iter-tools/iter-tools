/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$flat.test.ts#1643837503065
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { flat } from 'iter-tools-es';
import { wrapDeep, unwrap, unwrapDeep } from '../../../test/helpers.js';

describe('flat', () => {
  it('flats iterable', () => {
    const iter = flat(1, wrapDeep([[1, 2], [3, 4], [5]]));
    expect(unwrap(iter)).toEqual([1, 2, 3, 4, 5]);
  });

  it('flats iterable (default one level)', () => {
    const iter = flat(wrapDeep([[1, 2], [3, 4], [5]]));
    expect(unwrap(iter)).toEqual([1, 2, 3, 4, 5]);
  });

  it('flats iterable depth 0', () => {
    const iter = flat(0, wrapDeep([[1, 2], [3, 4], [5]]));
    expect(unwrapDeep(iter)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('flats iterable depth 2', () => {
    const iter = flat(2, wrapDeep([[1, 2], [3, [4, 5]], [[6]]]));
    expect(unwrap(iter)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('flats strings', () => {
    const iter = flat(2, wrapDeep([['a', 'b'], ['c', ['d', 'e']], [['f']]]));
    expect(unwrap(iter)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('does not expand string', () => {
    const iter = flat(2, wrapDeep(['foo', ['bar', ['baz']]]));
    expect(unwrap(iter)).toEqual(['foo', 'bar', 'baz']);
  });

  it('does not treat null as an iterable', () => {
    const iter = flat(2, wrapDeep(['foo', null]));
    expect(unwrap(iter)).toEqual(['foo', null]);
  });

  it('flats using custom shouldFlat', () => {
    const shouldFlat = (iter: any) => !(typeof iter === 'string' && iter.length === 1);
    const input = [['a', 'b'], ['c', ['d', 'e']], [['fghi']]];
    const result = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

    expect(unwrap(flat(shouldFlat, Infinity, input))).toEqual(result);
    expect(unwrap(flat({ shouldFlat, depth: Infinity }, input))).toEqual(result);
  });
});
