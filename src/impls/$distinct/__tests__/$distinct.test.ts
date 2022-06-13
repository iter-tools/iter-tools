import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $distinct } from 'iter-tools-es';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`distinct`, () => {
  describe('when source is empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($distinct(null)))).toEqual([]);
        expect($await($unwrap($distinct(undefined)))).toEqual([]);
        expect($await($unwrap($distinct($wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when source has only distinct values', () => {
    it(
      'yield those values',
      $async(() => {
        const source = [1];
        const result = [1];
        expect($await($unwrap($distinct($wrap(source))))).toEqual(result);
      }),
    );
  });

  describe('when source has duplicated values', () => {
    it(
      'only yield distinct values',
      $async(() => {
        const source = [1, 2, 3, 2];
        const result = [1, 2, 3];
        expect($await($unwrap($distinct($wrap(source))))).toEqual(result);
      }),
    );
  });

  describe('when source has values and a selector is specified', () => {
    it(
      'only yield distinct values based on the selector',
      $async(() => {
        const source = ['apple', 'apricot', 'blueberry'];
        const result = ['apple', 'blueberry'];
        expect($await($unwrap($distinct((x) => x[0], $wrap(source))))).toEqual(result);
      }),
    );
  });
});
