import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $append } from '@iter-tools/es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`append`, () => {
  describe('when source is empty', () => {
    it(
      'yields the specified value',
      $async(() => {
        expect($await($unwrap($append(1, null)))).toEqual([1]);
        expect($await($unwrap($append(1, undefined)))).toEqual([1]);
        expect($await($unwrap($append(1, $wrap([]))))).toEqual([1]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'yields values from source then the specified value',
      $async(() => {
        expect($await($unwrap($append(3, $wrap([1, 2]))))).toEqual([1, 2, 3]);
      }),
    );
  });
});
