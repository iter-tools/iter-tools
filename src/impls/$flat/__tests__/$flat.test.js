import { $, $isAsync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $flat } from 'iter-tools-es';
import { $wrapDeep, $unwrap, $unwrapDeep, anyType } from '../../../test/$helpers.js';

describe($`flat`, () => {
  it(
    'flats iterable',
    $async(() => {
      const iter = $flat(1, $wrapDeep([[1, 2], [3, 4], [5]]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5]);
    }),
  );

  it(
    'flats iterable (default one level)',
    $async(() => {
      const iter = $flat($wrapDeep([[1, 2], [3, 4], [5]]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5]);
    }),
  );

  it(
    'flats iterable depth 0',
    $async(() => {
      const iter = $flat(0, $wrapDeep([[1, 2], [3, 4], [5]]));
      expect($await($unwrapDeep(iter))).toEqual([[1, 2], [3, 4], [5]]);
    }),
  );

  it(
    'flats iterable depth 2',
    $async(() => {
      const iter = $flat(2, $wrapDeep([[1, 2], [3, [4, 5]], [[6]]]));
      expect($await($unwrap(iter))).toEqual([1, 2, 3, 4, 5, 6]);
    }),
  );

  it(
    'flats strings',
    $async(() => {
      const iter = $flat(2, $wrapDeep([['a', 'b'], ['c', ['d', 'e']], [['f']]]));
      expect($await($unwrap(iter))).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    }),
  );

  it(
    'does not expand string',
    $async(() => {
      const iter = $flat(2, $wrapDeep(['foo', ['bar', ['baz']]]));
      expect($await($unwrap(iter))).toEqual(['foo', 'bar', 'baz']);
    }),
  );

  it(
    'does not treat null as an iterable',
    $async(() => {
      const iter = $flat(2, $wrapDeep(['foo', null]));
      expect($await($unwrap(iter))).toEqual(['foo', null]);
    }),
  );

  it(
    'flats using custom shouldFlat',
    $async(() => {
      const shouldFlat = (iter: any) => !(typeof iter === 'string' && iter.length === 1);
      const input = [['a', 'b'], ['c', ['d', 'e']], [['fghi']]];
      const result = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

      expect($await($unwrap($flat(shouldFlat, Infinity, input)))).toEqual(result);
      expect($await($unwrap($flat(anyType({ shouldFlat, depth: Infinity }), input)))).toEqual(
        result,
      );
    }),
  );

  if ($isAsync) {
    it('may take an async shouldFlat callback', async () => {
      const iter = $flat(
        async (iter) => !(typeof iter === 'string' && iter.length === 1),
        Infinity,
        [['a', 'b'], ['c', ['d', 'e']], [['fghi']]],
      );
      expect(await $unwrap(iter)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
    });
  }
});
