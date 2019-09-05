import { $isAsync, $async, $await } from '../../../../generate/async.macro';
import { $join, $toArray } from '../../..';

describe($async`join`, () => {
  it(
    'should join each group with the provided value',
    $async(() => {
      expect($await($toArray($join([[1], [2], [3]])))).toEqual([1, 2, 3]);
    }),
  );

  it(
    'should have two adjacent separators when encountering an empty group',
    $async(() => {
      expect($await($toArray($join([[1], [], [3]])))).toEqual([1, 3]);
    }),
  );

  it(
    'should yield a single separator when joining two empty groups',
    $async(() => {
      expect($await($toArray($join([[], []])))).toEqual([]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($toArray($join(null)))).toEqual([]);
    }),
  );

  if (!$isAsync) {
    it('passes through the empty string', () => {
      expect($toArray($join(''))).toEqual([]);
    });

    describe('given a string', () => {
      it('should split on every item which is equal to the on argument', () => {
        expect($toArray($join(['11', '22', '33']))).toEqual(['1', '1', '2', '2', '3', '3']);
      });
    });
  }
});
