import { $, $isAsync, $async, $await, $iteratorSymbol } from '../../../../generate/async.macro.cjs';

import { $fork, $map } from '@iter-tools/es';
import { $wrap, $unwrap } from '../../../test/$helpers.js';

describe($`fork`, () => {
  const $makeIterable = $isAsync ? _asyncMakeIterable : _makeIterable;

  function* _makeIterable() {
    yield 1;
    yield 2;
    yield 3;
  }

  async function* _asyncMakeIterable() {
    yield 1;
    yield 2;
    yield 3;
  }

  it(
    'creates an iterable of iterables with the same values as its source',
    $async(() => {
      const [a, b, c] = $fork($makeIterable());
      const originalIter = $await($unwrap($makeIterable()));

      expect($await($unwrap($map((iter) => $unwrap(iter), [a, b, c])))).toEqual(
        Array(3).fill(originalIter),
      );
    }),
  );

  it(
    'does not matter which order the fork iterables are consumed in',
    $async(() => {
      const [a, b, c] = $fork($makeIterable());
      const originalIter = $await($unwrap($makeIterable()));
      expect($await($unwrap($map((iter) => $unwrap(iter), [c, b, a])))).toEqual(
        Array(3).fill(originalIter),
      );
    }),
  );

  describe('source iterable cleanup', () => {
    /* eslint-disable jest/expect-expect */
    it(
      'happens when a fork is exhausted',
      $async(() => {
        const iterableIterator = $fork($wrap([1, 2, 3]))[Symbol.iterator]();
        $await($unwrap(iterableIterator.next().value));
      }),
    );

    it(
      'happens when fork is exhausted and then all forks are exhausted',
      $async(() => {
        const [a, b] = $fork($wrap([1, 2, 3]));
        $await(a[$iteratorSymbol]().next());
        $await(a.return());
        $await(b[$iteratorSymbol]().next());
        $await(b.return());
      }),
    );

    it(
      'happens when all forks are exhausted then fork is exhausted',
      $async(() => {
        const iterableIterator = $fork($wrap([1, 2, 3]))[Symbol.iterator]();

        const a = iterableIterator.next().value;
        $await(a[$iteratorSymbol]().next());
        $await(a.return());

        const b = iterableIterator.next().value;
        $await(b[$iteratorSymbol]().next());
        $await(b.return());

        iterableIterator.return();
      }),
    );

    it(
      'happens even when a fork is closed without being used',
      $async(() => {
        const [a, b] = $fork($wrap([1, 2, 3]));
        $await(a.return());
        $await(b.return());
      }),
    );

    /* eslint-enable jest/expect-expect */
  });
});
