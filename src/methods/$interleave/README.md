Allows you to interleave items from multiple source iterables in a manner of your choosing. The inputs to interleave are a function we'll call `generateInterleaved` and some source iterables to be interleaved. `interleave` will transform each source iterable into an instance of a buffer, which you can use to inspect the current state of the sources and decide which value to emit.

The buffers are instances of an internal class called `InterleaveBuffer`, which has the following interface:

```ts
class InterleaveBuffer<T> {
  // The index of the current buffered item in the source
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

`generateInterleaved` also receives an additional first argument, `canTakeAny()` which returns true if there is any buffer which `canTake()`.

Finally, when generateInterleaved has finished it will clean up any source iterables which were not fully consumed.

Here is what an expected usage might look like:

```js
interleave(
  function*(canTakeAny, a, b) {
    while (canTakeAny()) {
      if (a.canTake()) yield a.take();
      if (a.canTake()) yield a.take();
      if (b.canTake()) yield b.take();
      if (b.canTake()) yield b.take();
    }
  },
  [1, 2, 5, 6],
  [3, 4, 7],
); // [1, 2, 3, 4, 5, 6, 7]
```

There is also an overload of `interleave` which allows you to pass an `options` argument to `generateInterleaved`. This allows you to create interleaves which are parameterized, like so:

```js
const roundRobin = interleave(function*(options, canTakeAny, ...buffers) {
  let i = options.start || 0;
  while (canTakeAny()) {
    yield buffers[i];
    i = (i + 1) % buffers.length;
  }
});

roundRobin({ start: 1 }, [2, 4, 6], [1, 3, 5]); // [1, 2, 3, 4, 5, 6]
```

```js
const aabbInterleave = asyncInterleave(async function*(canTakeAny, a, b) {
  while (await canTakeAny()) {
    if (await a.canTake()) yield await a.take();
    if (await a.canTake()) yield await a.take();
    if (await b.canTake()) yield await b.take();
    if (await b.canTake()) yield await b.take();
  }
});
```
