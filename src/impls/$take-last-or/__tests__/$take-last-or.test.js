import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $takeLastOr } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`takeLastOr`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns whenEmpty',
      $async(() => {
        expect($await($takeLastOr(0, null))).toBe(0);
        expect($await($takeLastOr(0, undefined))).toBe(0);
        expect($await($takeLastOr(0, $wrap([])))).toBe(0);
      }),
    );
  });

  describe('when iterable has values', () => {
    it(
      'returns last value',
      $async(() => {
        expect($await($takeLastOr(null, $wrap([1, 2, 3])))).toBe(3);
      }),
    );
  });
});
