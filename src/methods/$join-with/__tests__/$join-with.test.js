import { $, $isSync, $async, $await } from '../../../../generate/async.macro';

import { $joinWith, $toArray } from '../../..';

describe($`joinWith`, () => {
  it(
    'should join each group with the provided value',
    $async(() => {
      expect($await($toArray($joinWith(null, [[1], [2], [3]])))).toEqual([1, null, 2, null, 3]);
    }),
  );

  it(
    'should have two adjacent separators when encountering an empty group',
    $async(() => {
      expect($await($toArray($joinWith(null, [[1], [], [3]])))).toEqual([1, null, null, 3]);
    }),
  );

  it(
    'should yield a single separator when joining two empty groups',
    $async(() => {
      expect($await($toArray($joinWith(null, [[], []])))).toEqual([null]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($toArray($joinWith(0, null)))).toEqual([]);
    }),
  );

  if ($isSync) {
    it('passes through the empty string', () => {
      expect($toArray($joinWith(' ', ''))).toEqual([]);
    });

    describe('given a string', () => {
      it('should split on every item which is equal to the on argument', () => {
        expect($toArray($joinWith('Ø', ['11', '22', '33']))).toEqual([
          '1',
          '1',
          'Ø',
          '2',
          '2',
          'Ø',
          '3',
          '3',
        ]);
      });
    });
  }
});
