import { $, $async, $await } from '../../../../generate/async.macro';

import { $last } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`last`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns undefined',
      $async(() => {
        expect($await($last(null))).toBe(undefined);
        expect($await($last(undefined))).toBe(undefined);
        expect($await($last($wrap([])))).toBe(undefined);
      }),
    );
  });

  describe('when iterable contains values', () => {
    it(
      'returns last value',
      $async(() => {
        expect($await($last($wrap([1, 2, 3])))).toBe(3);
      }),
    );
  });
});
