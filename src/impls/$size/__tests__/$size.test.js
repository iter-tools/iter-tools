import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $size } from '@iter-tools/es';
import { $wrap } from '../../../test/$helpers.js';

describe($`size`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns 0',
      $async(() => {
        expect($await($size(null))).toBe(0);
        expect($await($size(undefined))).toBe(0);
        expect($await($size($wrap([])))).toBe(0);
      }),
    );
  });

  describe('when iterable contains values', () => {
    it(
      'return number of items in iterable',
      $async(() => {
        expect($await($size($wrap([1, 2, 3, 4, 5, 6])))).toBe(6);
      }),
    );
  });
});
