import { $isAsync, $async, $await, $iteratorSymbol } from '../../generate/async.macro';
import { $fork, $map, $toArray } from '..';
import { $OneTwoThreeIterable } from './__framework__/fixtures';

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

const $makeIterable = $isAsync ? _asyncMakeIterable : _makeIterable;

describe($async`fork`, () => {
  it(
    'creates an iterable of iterables with the same values as its source',
    $async(() => {
      const [a, b, c] = $fork($makeIterable());
      const originalIter = $await($toArray($makeIterable()));

      expect($await($toArray($map(iter => $toArray(iter), [a, b, c])))).toEqual(
        Array(3).fill(originalIter),
      );
    }),
  );

  it(
    'can take a number as first argument',
    $async(() => {
      const gen = $fork(3, $makeIterable());
      const originalIter = $await($toArray($makeIterable()));
      expect($await($toArray($map(iter => $toArray(iter), gen)))).toEqual(
        Array(3).fill(originalIter),
      );
    }),
  );

  it(
    'can be curried',
    $async(() => {
      const gen = $fork(3)($makeIterable());
      const originalIter = $await($toArray($makeIterable()));
      expect($await($toArray($map(iter => $toArray(iter), gen)))).toEqual(
        Array(3).fill(originalIter),
      );
    }),
  );

  it(
    'it does not matter which order the fork iterables are consumed in',
    $async(() => {
      const [a, b, c] = $fork($makeIterable());
      const originalIter = $await($toArray($makeIterable()));
      expect($await($toArray($map(iter => $toArray(iter), [c, b, a])))).toEqual(
        Array(3).fill(originalIter),
      );
    }),
  );

  describe('source iterable cleanup', () => {
    it(
      'happens when a fork is exhausted',
      $async(() => {
        const oneTwoThree = new $OneTwoThreeIterable();
        const iterableIterator = $fork(oneTwoThree)[Symbol.iterator]();
        $await($toArray(iterableIterator.next().value));
        expect(oneTwoThree).toHaveProperty('isCleanedUp', true);
      }),
    );

    it(
      'happens when fork is exhausted and then all forks are exhausted',
      $async(() => {
        const oneTwoThree = new $OneTwoThreeIterable();
        const [a, b] = $fork(oneTwoThree);
        expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
        $await(a[$iteratorSymbol]().next());
        $await(a.return());
        expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
        $await(b[$iteratorSymbol]().next());
        $await(b.return());
        expect(oneTwoThree).toHaveProperty('isCleanedUp', true);
      }),
    );

    it(
      'happens when all forks are exhausted then fork is exhausted',
      $async(() => {
        const oneTwoThree = new $OneTwoThreeIterable();
        const iterableIterator = $fork(oneTwoThree)[Symbol.iterator]();

        const a = iterableIterator.next().value;
        $await(a[$iteratorSymbol]().next());
        $await(a.return());
        expect(oneTwoThree).toHaveProperty('isCleanedUp', false);

        const b = iterableIterator.next().value;
        $await(b[$iteratorSymbol]().next());
        $await(b.return());
        expect(oneTwoThree).toHaveProperty('isCleanedUp', false);

        iterableIterator.return();

        expect(oneTwoThree).toHaveProperty('isCleanedUp', true);
      }),
    );

    it(
      'happens even when a fork is closed without being used',
      $async(() => {
        const oneTwoThree = new $OneTwoThreeIterable();
        const [a, b] = $fork(oneTwoThree);
        expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
        $await(a.return());
        expect(oneTwoThree).toHaveProperty('isCleanedUp', false);
        $await(b.return());
        expect(oneTwoThree).toHaveProperty('isCleanedUp', true);
      }),
    );
  });
});
