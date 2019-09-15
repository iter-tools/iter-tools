import { $isAsync, $async, $await } from '../../../generate/async.macro';
import { asyncify } from '../async-iterable';
import { $ensureIterable, $isIterable, $iterableCurry } from '../$iterable';
import { range, $toArray } from '../..';

describe($async`ensureIterable`, () => {
  if ($isAsync) {
    it('transform sync iter to async', async () => {
      const iter = $ensureIterable(range({ start: 1, end: 4 }));
      expect(await iter.next()).toEqual({ value: 1, done: false });
      expect(await iter.next()).toEqual({ value: 2, done: false });
      expect(await iter.next()).toEqual({ value: 3, done: false });
      expect(await iter.next()).toEqual({ value: undefined, done: true });
    });
  } else {
    it('works with iterables', () => {
      const i = range(3);
      expect(i).toBe($ensureIterable(i));
      expect(Array.from($ensureIterable(i))).toEqual([0, 1, 2]);
    });
    it('works with Symbol.iterator', () => {
      const i = $ensureIterable([0, 1, 2]);
      expect(Array.from(i)).toEqual([0, 1, 2]);
    });
    it('works with null', () => {
      const i = $ensureIterable(null);
      expect(Array.from(i)).toEqual([]);
    });
  }
});

describe($async`isIterable`, () => {
  it('works', () => {
    expect($isIterable(range(3))).toBe(!$isAsync);
    expect($isIterable([])).toBe(!$isAsync);
    expect($isIterable(null)).toBe(false);
    if ($isAsync) {
      expect($isIterable(asyncify([]))).toBe(true);
    }
  });
});

class Hello {}
class Goodbye {}
class World {}

const hello = new Hello();
const goodbye = new Goodbye();
const world = new World();

$async;
function* iter(...args) {
  yield* args;
}

$async;
function add(initial, iterable) {
  let result = initial;
  $await;
  for (const number of iterable) {
    result += number;
  }
  return result;
}

$async;
function addAll(initial, iterables) {
  let result = initial;
  for (const iterable of iterables) {
    $await;
    for (const number of iterable) {
      result += number;
    }
  }
  return result;
}

describe($async`iterableCurry`, () => {
  const f2 = (iterable, a, b) => iter(a, b);
  const f1 = (iterable, a) => iter(a);
  const f0 = iterable => iter();
  const c2 = $iterableCurry(f2);
  const c1 = $iterableCurry(f1);
  const c0 = $iterableCurry(f0);
  /* eslint-disable no-unused-expressions */
  f2.name; // Make sure names don't get thrown away by babel-minify
  f1.name;
  f0.name;
  /* eslint-enable no-unused-expressions */

  it(
    'curries',
    $async(() => {
      expect($await($toArray(c2(hello, world, [])))).toEqual([hello, world]);
      expect($await($toArray(c2(hello, world)([])))).toEqual([hello, world]);
      expect($await($toArray(c2(hello)(world, [])))).toEqual([hello, world]);
      expect($await($toArray(c2(hello)(world)([])))).toEqual([hello, world]);
      expect($await($toArray(c1(hello, [])))).toEqual([hello]);
      expect($await($toArray(c1(hello)([])))).toEqual([hello]);
      expect($await($toArray(c0([])))).toEqual([]);
    }),
  );

  it(
    'curries with empty invocations',
    $async(() => {
      expect($await($toArray(c2()(hello)(world)([])))).toEqual([hello, world]);
      expect($await($toArray(c2(hello)()(world)([])))).toEqual([hello, world]);
      expect($await($toArray(c2(hello)(world)()([])))).toEqual([hello, world]);
      expect($await($toArray(c1()(hello)()([])))).toEqual([hello]);
      expect($await($toArray(c0()()([])))).toEqual([]);
    }),
  );

  it(
    'ignores extra arguments after iterable',
    $async(() => {
      expect($await($toArray(c2(hello, world, [], 'foo')))).toEqual([hello, world]);
      expect($await($toArray(c1(hello)([], null)))).toEqual([hello]);
      expect($await($toArray(c0([], 4)))).toEqual([]);
    }),
  );

  it('throws with too many args', () => {
    expect(() => c2(hello)(goodbye)(world)([])).toThrowErrorMatchingSnapshot();
    expect(() => c1(hello)(world)([])).toThrowErrorMatchingSnapshot();
    expect(() => c0(hello)([])).toThrowErrorMatchingSnapshot();
  });

  describe('validates args', () => {
    it('can stop method execution by throwing an error', () => {
      const helloImpl = jest.fn();
      const hello = $iterableCurry(helloImpl, {
        minArgs: 1,
        maxArgs: 1,
        validateArgs(args) {
          const [world] = args;
          if (!(world instanceof World)) {
            throw new Error('Expected the world');
          }
        },
      });
      expect(() => hello(null, [])).toThrowErrorMatchingSnapshot();
      expect(helloImpl).not.toHaveBeenCalled();
    });

    it(
      'can alter arguments',
      $async(() => {
        const empty = $async(function*() {})();
        const helloImpl = jest.fn($async(function*() {}));
        const hello = $iterableCurry(helloImpl, {
          minArgs: 1,
          maxArgs: 1,
          validateArgs(args) {
            args[0] = world;
          },
        });
        $await($toArray(hello(null, empty)));
        expect(helloImpl).toHaveBeenCalledWith(empty, world);
      }),
    );
  });

  describe('when passed explicit arity', () => {
    const f = (c, a = goodbye, b = world) => iter(a, b);
    const c = $iterableCurry(f, { minArgs: 0, maxArgs: 2 });
    /* eslint-disable no-unused-expressions */
    f.name; // Make sure it don't get thrown away by babel-minify
    /* eslint-enable no-unused-expressions */

    it(
      'curries',
      $async(() => {
        expect($await($toArray(c(hello)(world)([])))).toEqual([hello, world]);
        expect($await($toArray(c(hello)([])))).toEqual([hello, world]);
        expect($await($toArray(c([])))).toEqual([goodbye, world]);
      }),
    );

    it(
      'curries with empty invocations',
      $async(() => {
        expect($await($toArray(c()(hello)(world)([])))).toEqual([hello, world]);
        expect($await($toArray(c()()(hello)([])))).toEqual([hello, world]);
        expect($await($toArray(c()()()([])))).toEqual([goodbye, world]);
      }),
    );

    it('throws with too many args', () => {
      expect(() => c(hello)(goodbye)(world)([])).toThrowError(
        new Error(
          `f takes up to 2 arguments, followed by ${$async`iterable`}. You already passed 3 arguments and the last argument was not ${$async`iterable`}`,
        ),
      );
    });
  });

  describe('works with reducing functions', () => {
    const f2 = (iterable, a, b) => add(a + b, iterable);
    const f1 = (iterable, a) => add(a, iterable);
    const f0 = iterable => add(0, iterable);
    const c2 = $iterableCurry(f2, { reduces: true });
    const c1 = $iterableCurry(f1, { reduces: true });
    const c0 = $iterableCurry(f0, { reduces: true });
    /* eslint-disable no-unused-expressions */
    f2.name; // Make sure names don't get thrown away by babel-minify
    f1.name;
    f0.name;
    /* eslint-enable no-unused-expressions */

    it(
      'curries',
      $async(() => {
        expect($await(c2(1)(2)([4]))).toBe(7);
        expect($await(c1(1)([2]))).toBe(3);
        expect($await(c0([1]))).toBe(1);
      }),
    );

    it(
      'curries with empty invocations',
      $async(() => {
        expect($await(c2()(1, 2, [4]))).toBe(7);
        expect($await(c2(1, 2)()([4]))).toBe(7);
        expect($await(c2(1)()(2, [4]))).toBe(7);
        expect($await(c2(1)()(2)()([4]))).toBe(7);
        expect($await(c1(1)()([2]))).toBe(3);
        expect($await(c0()([1]))).toBe(1);
      }),
    );

    it('throws with too many args', () => {
      expect(() => c2(1)(2)(3)([])).toThrowErrorMatchingSnapshot();
      expect(() => c1(1)(2)([])).toThrowErrorMatchingSnapshot();
      expect(() => c0(1)([])).toThrowErrorMatchingSnapshot();
    });
  });

  describe('works with variadic functions', () => {
    const f1 = (iterables, a) => addAll(a, iterables);
    /* eslint-disable no-unused-expressions */
    f1.name; // Make sure it doesn't get thrown away by babel-minify
    /* eslint-enable no-unused-expressions */
    const c1 = $iterableCurry(f1, { variadic: true, reduces: true });

    it(
      'curries',
      $async(() => {
        expect($await(c1(1)([2, 4], [8, 16]))).toBe(31);
        expect($await(c1(1)([2, 4]))).toBe(7);
      }),
    );

    it(
      'curries with empty invocations',
      $async(() => {
        expect($await(c1(1)()([2, 4]))).toBe(7);
      }),
    );

    it('throws with too many args', () => {
      expect(() => c1(1)(2)([4, 8])).toThrowErrorMatchingSnapshot();
    });
  });
});
