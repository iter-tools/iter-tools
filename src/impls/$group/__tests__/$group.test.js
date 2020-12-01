import { $, $async, $await } from '../../../../generate/async.macro.cjs';
import { $awaitError } from '../../../../generate/test.macro.cjs';

import { $group } from 'iter-tools-es';
import { $wrap, $unwrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`group`, () => {
  describe('when source is empty', () => {
    it(
      'yields no groups',
      $async(() => {
        expect($await($unwrapDeep($group(null)))).toEqual([]);
        expect($await($unwrapDeep($group(undefined)))).toEqual([]);
        expect($await($unwrapDeep($group($wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when values from source cannot be grouped', () => {
    it(
      'yields a group for each value',
      $async(() => {
        expect($await($unwrapDeep($group($wrap([1, 2, 3]))))).toEqual([
          [1, [1]],
          [2, [2]],
          [3, [3]],
        ]);
      }),
    );
  });

  describe('when source contains subsequent values belonging to the same group', () => {
    it(
      'coalesces values into groups',
      $async(() => {
        expect($await($unwrapDeep($group('aaa')))).toEqual([['a', ['a', 'a', 'a']]]);
        expect($await($unwrapDeep($group('bbabb')))).toEqual([
          ['b', ['b', 'b']],
          ['a', ['a']],
          ['b', ['b', 'b']],
        ]);
      }),
    );
  });

  describe('when groups are consumed out of order', () => {
    it(
      'throws',
      $async(() => {
        const iter = $group('AB');
        const [, As] = $await(iter.next()).value;
        const [, Bs] = $await(iter.next()).value;

        $await($unwrap(Bs));

        expect($awaitError($unwrap(As))).toMatchSnapshot();
      }),
    );
  });
});
