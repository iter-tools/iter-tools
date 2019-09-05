import { $async, $await } from '../../../../generate/async.macro';
import { $isSorted, $wrap } from '../../..';

describe($async`isSorted`, () => {
  it(
    'returns true for a numerically sorted input iterable',
    $async(() => {
      expect($await($isSorted($wrap([1, 2, 3])))).toEqual(true);
    }),
  );

  it(
    'returns true for an alphabetically sorted input string',
    $async(() => {
      expect($await($isSorted('abc'))).toEqual(true);
    }),
  );

  it(
    'returns true for a numerically sorted input iterable with duplicates',
    $async(() => {
      expect($await($isSorted($wrap([1, 2, 2, 2, 3])))).toEqual(true);
    }),
  );

  it(
    'returns true when the input contains only one item',
    $async(() => {
      expect($await($isSorted($wrap([9000])))).toEqual(true);
    }),
  );

  it(
    'returns true when the input is empty',
    $async(() => {
      expect($await($isSorted($wrap([])))).toEqual(true);
    }),
  );

  it(
    'returns false when the input is not sorted',
    $async(() => {
      expect($await($isSorted($wrap([2, 1])))).toEqual(false);
    }),
  );

  describe('with an explicit comparator', () => {
    it(
      'returns true for a numerically sorted input iterable',
      $async(() => {
        expect($await($isSorted((a, b) => a - b, $wrap([1, 1, 2, 3, 5, 8])))).toEqual(true);
      }),
    );

    it(
      'returns true for reverse sorted input iterable (with reverse comparator)',
      $async(() => {
        expect($await($isSorted((a, b) => b - a, $wrap([8, 5, 3, 2, 1, 1])))).toEqual(true);
      }),
    );

    it(
      'returns false if the comparator returns 1',
      $async(() => {
        expect($await($isSorted(_ => 1, $wrap([1, 2])))).toEqual(false);
      }),
    );
  });
});
