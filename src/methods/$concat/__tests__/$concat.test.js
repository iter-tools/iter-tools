import { $, $async, $await } from '../../../../generate/async.macro';

import { $concat } from '../../..';
import { $wrap, $unwrap } from '../../../test/$helpers';

describe($`concat`, () => {
  describe('when there are no sources', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($concat()))).toEqual([]);
      }),
    );
  });

  describe('when sources are empty', () => {
    it(
      'yields no values',
      $async(() => {
        expect($await($unwrap($concat(null, undefined, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when sources contain values', () => {
    it(
      "each source's values are yielded in sequence",
      $async(() => {
        expect($await($unwrap($concat($wrap([1, 2]), $wrap([3, 4]))))).toEqual([1, 2, 3, 4]);
      }),
    );
  });
});
