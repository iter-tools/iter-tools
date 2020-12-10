Returns a [singleton async iterable iterator](#singletonasynciterableiterator) which yields the same values as `source`. For every value the next `n` values also start their computation in parallel. It may or may not be possible for useful work to be done in parallel depending on the nature of `source`.

An example of a situation in which it is possible to parallelize is when you have a series of expensive requests to make and you know in advance what they will be:

```js
pipe(
  range,
  asyncMap(i => fetch(`/page/${i}`).then(res => res.json()),
  asyncSlice(0, 50),
  asyncBuffer(4),
  toArray
);
```

The above code could fetch four pages at once, potentially greatly speeding up the process when compared code that did not use `asyncBuffer`.

It is important to note that the method will always try to buffer past the end of your iterable. This is a design limitation of async iterators. This is usually fine, but makes it unwise to specify extremely high values for `n`. `asyncBuffer(Infinity, source)` for example would simply be an infinite loop. For this reason all values of `n >= 1024` are forbidden. This is expected to be a very permissive limit. In practice `n` should probably be in the range of `2` to `16`. You must recall that Javascript is fundamentally single threaded, so having more CPU cores will not help you execute such "parallelized" code any faster.

Here is a fuller example demonstrating the mechanics of `asyncBuffer`:

```js
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const source = asyncMap(
  (_) => new Promise((resolve) => setTimeout(resolve, 200)),
  range(),
);

const buffered = asyncBuffer(6, source); // Values start buffering

await delay(800));

// Four values are already buffered here
await buffered.next(); // ~0ms
await buffered.next(); // ~0ms
await buffered.next(); // ~0ms
await buffered.next(); // ~0ms

// After this point values are being requested as fast as they
// can possibly be fulfilled, so buffer offers no additional benefits.
await buffered.next(); // ~200ms
await buffered.next(); // ~200ms

// But if additional delays are incurred in processing values,
// it has value again!
await delay(300);

await buffered.next(); // ~0ms
await buffered.next(); // ~100ms
await buffered.next(); // ~200ms
// ...
```
