import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $takeLast } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`takeLast`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns undefined',
      $async(() => {
        expect($await($takeLast(null))).toBe(undefined);
        expect($await($takeLast(undefined))).toBe(undefined);
        expect($await($takeLast($wrap([])))).toBe(undefined);
      }),
    );
  });

  describe('when iterable has values', () => {
    it(
      'returns last value',
      $async(() => {
        expect($await($takeLast($wrap([1, 2, 3])))).toBe(3);
      }),
    );
  });
});
