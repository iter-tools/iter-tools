import { $, $async, $await } from '../../../../generate/async.macro';

import { $collate, $toArray } from '../../..';

describe($`collate`, () => {
  describe('by position', () => {
    it(
      'starts at 0 with step 1 if given no config arguments',
      $async(() => {
        const iter = $collate([1, 4, 7], [2, 5, 8], [3, 6, 9]);
        expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }),
    );

    it(
      'can have a configurable step',
      $async(() => {
        const iter = $collate(2, [1, 4, 7], [3, 6, 9], [2, 5, 8]);
        expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }),
    );

    it(
      'can have a configurable start and step',
      $async(() => {
        const iter = $collate(1, 2, [2, 5, 8], [1, 4, 7], [3, 6, 9]);
        expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }),
    );

    it(
      'can have start and step specified in a config object',
      $async(() => {
        const iter = $collate({ start: 1, step: 1 }, [3, 6, 9], [1, 4, 7], [2, 5, 8]);
        expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }),
    );

    it(
      'works with input iterables of different lengths',
      $async(() => {
        const iter = $collate([], [1, 3], [2]);
        expect($await($toArray(iter))).toEqual([1, 2, 3]);
      }),
    );
  });

  describe('by comparison', () => {
    it(
      'output is sorted if passed a comparator',
      $async(() => {
        const iter = $collate((a, b) => b - a, [1, 8, 9], [4, 6, 7], [2, 3, 5]);
        expect($await($toArray(iter))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }),
    );

    it(
      'works with input iterables of different lengths',
      $async(() => {
        const iter = $collate((a, b) => b - a, [], [2, 3], [1]);
        expect($await($toArray(iter))).toEqual([1, 2, 3]);
      }),
    );
  });
});
