import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $__method__ } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`__method__`, () => {
  describe('when source is empty', () => {
    it(
      'TODO: describe the result of mapping an empty source',
      $async(() => {
        expect($await($unwrap($__method__(null)))).toEqual([]);
        expect($await($unwrap($__method__(undefined)))).toEqual([]);
        expect($await($unwrap($__method__($wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'TODO: describe result of mapping values',
      $async(() => {
        expect($await($unwrap($__method__($wrap([1, 2, 3]))))).toEqual([1, 2, 3]);
      }),
    );
  });
});
