import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $__method__ } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`__method__`, () => {
  describe('when source is empty', () => {
    it(
      'TODO: describe the result of reducing an empty source',
      $async(() => {
        expect($await($__method__(null))).toEqual(0);
        expect($await($__method__(undefined))).toEqual(0);
        expect($await($__method__($wrap([])))).toEqual(0);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'TODO: describe result of reducing values',
      $async(() => {
        expect($await($__method__($wrap([1, 2, 3])))).toEqual(6);
      }),
    );
  });
});
