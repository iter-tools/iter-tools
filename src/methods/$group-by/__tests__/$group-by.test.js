import { $, $async, $await, $Promise } from '../../../../generate/async.macro';
import { $awaitError } from '../../../../generate/test.macro';

import { $groupBy } from '../../..';
import { $wrap, $unwrap, $unwrapDeep } from '../../../test/$helpers';

$async;
function identity<T>(value: T): $Promise<T> {
  return value;
}

describe($`groupBy`, () => {
  describe('when source is empty', () => {
    it(
      'yields no groups',
      $async(() => {
        expect($await($unwrapDeep($groupBy(identity, null)))).toEqual([]);
        expect($await($unwrapDeep($groupBy(identity, undefined)))).toEqual([]);
        expect($await($unwrapDeep($groupBy(identity, $wrap([]))))).toEqual([]);
      }),
    );
  });

  describe('when values from source cannot be grouped', () => {
    it(
      'yields a group for each value',
      $async(() => {
        expect(
          $await($unwrapDeep($groupBy($async((_: number, i: number) => i), $wrap([0, 0, 0])))),
        ).toEqual([[0, [0]], [1, [0]], [2, [0]]]);
      }),
    );
  });

  describe('when source contains subsequent values belonging to the same group', () => {
    it(
      'coalesces values into groups',
      $async(() => {
        const lowerCase = $async((item: string) => item.toLowerCase());
        expect($await($unwrapDeep($groupBy(lowerCase, 'AaA')))).toEqual([['a', ['A', 'a', 'A']]]);
        expect($await($unwrapDeep($groupBy(lowerCase, 'baA')))).toEqual([
          ['b', ['b']],
          ['a', ['a', 'A']],
        ]);
      }),
    );
  });

  describe('when groups are consumed out of order', () => {
    it(
      'throws',
      $async(() => {
        const iter = $groupBy(identity, 'AB');
        const [, As] = $await(iter.next()).value;
        const [, Bs] = $await(iter.next()).value;

        $unwrap(Bs);

        expect($awaitError($unwrap(As))).toMatchSnapshot();
      }),
    );
  });
});
