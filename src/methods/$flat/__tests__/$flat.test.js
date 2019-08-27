import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $flat, asyncFlat, $toArray, asyncToArray } from '../../..';

describe($async`flat`, () => {
  it(
    'flats iterable',
    $async(() => {
      const iter = $flat(1, [[1, 2], [3, 4], [5]]);
      expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5]);
    }),
  );

  it(
    'flats iterable (default one level)',
    $async(() => {
      const iter = $flat([[1, 2], [3, 4], [5]]);
      expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5]);
    }),
  );

  it(
    'flats iterable, curried',
    $async(() => {
      const iter = $flat(1)([[1, 2], [3, 4], [5]]);
      expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5]);
    }),
  );

  it(
    'flats iterable, curried (default one level)',
    $async(() => {
      const iter = $flat()([[1, 2], [3, 4], [5]]);
      expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5]);
    }),
  );

  it(
    'flats iterable depth 0',
    $async(() => {
      const iter = $flat(0, [[1, 2], [3, 4], [5]]);
      expect($await($toArray(iter))).toEqual([[1, 2], [3, 4], [5]]);
    }),
  );

  it(
    'flats iterable depth 2',
    $async(() => {
      const iter = $flat(2, [[1, 2], [3, [4, 5]], [[6]]]);
      expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5, 6]);
    }),
  );

  it(
    'flats strings',
    $async(() => {
      const iter = $flat(2, [['a', 'b'], ['c', ['d', 'e']], [['f']]]);
      expect($await($toArray(iter))).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    }),
  );

  it(
    'does not expand string',
    $async(() => {
      const iter = $flat(2, ['foo', ['bar', ['baz']]]);
      expect($await($toArray(iter))).toEqual(['foo', 'bar', 'baz']);
    }),
  );

  it(
    'flats using custom function',
    $async(() => {
      const iter = $flat(iter => !(typeof iter === 'string' && iter.length === 1), Infinity, [
        ['a', 'b'],
        ['c', ['d', 'e']],
        [['fghi']],
      ]);
      expect($await($toArray(iter))).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
    }),
  );

  if ($isAsync) {
    it('flats using custom function (using a promise)', async () => {
      const iter = asyncFlat(
        async iter => !(typeof iter === 'string' && iter.length === 1),
        Infinity,
        [['a', 'b'], ['c', ['d', 'e']], [['fghi']]],
      );
      expect(await asyncToArray(iter)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
    });
  }
});
