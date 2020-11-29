import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $join } from '@iter-tools/es';
import { $wrapDeep, $unwrap } from '../../../test/$helpers.js';

describe($`join`, () => {
  it(
    'should join each group with the provided value',
    $async(() => {
      expect($await($unwrap($join($wrapDeep([[1], [2], [3]]))))).toEqual([1, 2, 3]);
    }),
  );

  it(
    'should have two adjacent separators when encountering an empty group',
    $async(() => {
      expect($await($unwrap($join($wrapDeep([[1], [], [3]]))))).toEqual([1, 3]);
    }),
  );

  it(
    'should yield a single separator when joining two empty groups',
    $async(() => {
      expect($await($unwrap($join($wrapDeep([[], []]))))).toEqual([]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($unwrap($join(null)))).toEqual([]);
      expect($await($unwrap($join(undefined)))).toEqual([]);
      expect($await($unwrap($join($wrapDeep([]))))).toEqual([]);
    }),
  );

  if ($isSync) {
    it('passes through the empty string', () => {
      expect($unwrap($join(''))).toEqual([]);
    });

    describe('given a string', () => {
      it('should split on every value which is equal to the on argument', () => {
        expect($unwrap($join(['11', '22', '33']))).toEqual(['1', '1', '2', '2', '3', '3']);
      });
    });
  }
});
