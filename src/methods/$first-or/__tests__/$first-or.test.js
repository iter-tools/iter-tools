import { $, $async, $await } from '../../../../generate/async.macro';

import { $firstOr } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`firstOr`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns whenEmpty',
      $async(() => {
        expect($await($firstOr(0, null))).toBe(0);
        expect($await($firstOr(0, undefined))).toBe(0);
        expect($await($firstOr(0, $wrap([])))).toBe(0);
      }),
    );
  });

  describe('when iterable contains values', () => {
    it(
      'returns first value',
      $async(() => {
        expect($await($firstOr(null, $wrap([1, 2, 3])))).toBe(1);
      }),
    );
  });
});
