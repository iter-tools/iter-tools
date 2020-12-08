import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $reverse } from 'iter-tools-es';
import { $unwrap, $wrap } from '../../../test/$helpers.js';

describe($`reverse`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($reverse(null)))).toEqual([]);
        expect($await($unwrap($reverse(undefined)))).toEqual([]);
        expect($await($unwrap($reverse($wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'yields values in reverse order',
      $async(() => {
        expect($await($unwrap($reverse($wrap([1, 2, 3]))))).toEqual([3, 2, 1]);
      }),
    );
  });
});
