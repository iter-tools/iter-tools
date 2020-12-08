import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $compress } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`compress`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($compress(null, null)))).toEqual([]);
        expect($await($unwrap($compress(undefined, undefined)))).toEqual([]);
        expect($await($unwrap($compress($wrap([]), $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source and included are the same size', () => {
    it(
      'yields values for which included is truthy',
      $async(() => {
        expect($await($unwrap($compress($wrap([1, 2, 3]), $wrap([true, false, true]))))).toEqual([
          1,
          3,
        ]);

        // prettier-ignore
        // @ts-ignore
        expect($await($unwrap($compress($wrap([1, 2, 3]), $wrap([1, 0, 'true']))))).toEqual([
          1,
          3,
        ]);
      }),
    );
  });

  describe('when source is larger than included', () => {
    it(
      'yields only as many values as are in included',
      $async(() => {
        const source = $wrap([1, 2, 3, 4]);
        const included = $wrap([true, true]);
        expect($await($unwrap($compress(source, included)))).toEqual([1, 2]);
      }),
    );
  });

  describe('when included is larger than source', () => {
    it(
      'yields only as many values as are in source',
      $async(() => {
        const source = $wrap([1, 2, 3]);
        const included = $wrap([true, true, true, true, true]);
        expect($await($unwrap($compress(source, included)))).toEqual([1, 2, 3]);
      }),
    );
  });
});
