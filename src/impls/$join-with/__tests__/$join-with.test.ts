import { $, $isSync, $async, $await } from '../../../../generate/async.macro.cjs';

import { $joinWith } from 'iter-tools-es';
import { $wrapDeep, $unwrap } from '../../../test/$helpers.js';

describe($`joinWith`, () => {
  it(
    'should join each group with the provided value',
    $async(() => {
      expect($await($unwrap($joinWith(null, $wrapDeep([[1], [2], [3]]))))).toEqual([
        1,
        null,
        2,
        null,
        3,
      ]);
    }),
  );

  it(
    'should have two adjacent separators when encountering an empty group',
    $async(() => {
      expect($await($unwrap($joinWith(null, $wrapDeep([[1], [], [3]]))))).toEqual([
        1,
        null,
        null,
        3,
      ]);
    }),
  );

  it(
    'should yield a single separator when joining two empty groups',
    $async(() => {
      expect($await($unwrap($joinWith(null, $wrapDeep([[], []]))))).toEqual([null]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($unwrap($joinWith(0, null)))).toEqual([]);
      expect($await($unwrap($joinWith(0, undefined)))).toEqual([]);
      expect($await($unwrap($joinWith(0, $wrapDeep([]))))).toEqual([]);
    }),
  );

  if ($isSync) {
    describe('when source is a string', () => {
      it(
        'warns',
        $async(() => {
          $joinWith(null, 'abc');
          expect(console.warn).callsMatchSnapshot();
        }),
      );
    });
  }
});
