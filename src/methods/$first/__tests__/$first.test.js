import { $, $async, $await } from '../../../../generate/async.macro';

import { $first } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`first`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns undefined',
      $async(() => {
        expect($await($first(null))).toBe(undefined);
        expect($await($first(undefined))).toBe(undefined);
        expect($await($first($wrap([])))).toBe(undefined);
      }),
    );
  });

  describe('when iterable has values', () => {
    it(
      'returns first value',
      $async(() => {
        expect($await($first($wrap([1, 2, 3])))).toBe(1);
      }),
    );
  });
});
