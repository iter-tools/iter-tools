Facilitates the creation of new strategies for interleaving items from multiple iterables. It does this by decorating the `generateInterleaved` generator, which is to say providing it with arguments and yielding its values. While `generateInterleaved` may yield many values, being a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) it is called only once. The call will look like: `generateInterleaved(canTakeAny, ...buffers)`. Fuller documentation of what each of these arguments is and does follows the example, which shows the curried form of the function.

```js
const aabbInterleave = interleave(function*(
  canTakeAny,
  ...buffers
) {
  const [a, b] = buffers;
  // canTakeAny returns a truthy value if any buffer canTake()
  while (canTakeAny()) {
    if (a.canTake()) yield a.take();
    if (a.canTake()) yield a.take();
    if (b.canTake()) yield b.take();
    if (b.canTake()) yield b.take();
  }
});

const a = [1, 2, 5, 6];
const b = [3, 4, 7];

aabbInterleave(a, b); // [1, 2, 3, 4, 5, 6, 7]
```

Hopefully now that you can see how `buffers` is used, the definition of a `buffer` will make more sense: each `buffer` is an instance of `InterleaveBuffer` which stores a single value from a single `source` iterable.

```ts
class InterleaveBuffer<T> {
  // The index of the current buffered value in the source
  index: number;

  // The index of the source which this buffer represents
  bufferIndex: number;

  // Returns the current buffered value
  peek(): T;

  // Returns false if the source iterable is done
  // To be sure that your output is the same size as your combined inputs always call canTake before take.
  canTake(): boolean;

  // Returns the current buffered value and buffers the next one.
  // Expected to be used with yield.
  take(): T;
}
```

When `generateInterleaved` has finished `interleave` will clean up any `source` which was not fully consumed.

There is also an overload of `interleave` which allows you to pass an `options` argument to `generateInterleaved`. This allows you to create interleaves which are parameterized, like so:

```js
const roundRobin = interleave(function*(
  options,
  canTakeAny,
  ...buffers
) {
  let i = options.start || 0;
  while (canTakeAny()) {
    yield buffers[i];
    i = (i + 1) % buffers.length;
  }
});

roundRobin({ start: 1 }, [2, 4, 6], [1, 3, 5]); // [1, 2, 3, 4, 5, 6]
```
