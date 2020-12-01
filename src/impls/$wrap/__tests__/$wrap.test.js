import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $wrap } from 'iter-tools-es';
import { $wrap as $testWrap, $unwrap } from '../../../test/$helpers.js';

describe($`wrap`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($wrap(undefined)))).toEqual([]);
        expect($await($unwrap($wrap(null)))).toEqual([]);
        expect($await($unwrap($wrap($testWrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'yields the values from source',
      $async(() => {
        expect($await($unwrap($wrap([1, 2, 3])))).toEqual([1, 2, 3]);
        expect($await($unwrap($wrap($testWrap([1, 2, 3]))))).toEqual([1, 2, 3]);
      }),
    );
  });

  it(
    'can be consumed multiple times if its input can',
    $async(() => {
      const wrapped = $wrap([1, 2, 3]);
      expect($await($unwrap(wrapped))).toEqual([1, 2, 3]);
      expect($await($unwrap(wrapped))).toEqual([1, 2, 3]);
    }),
  );
});
