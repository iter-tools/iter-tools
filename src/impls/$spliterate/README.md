Facilitates the creation of methods which split a `source` iterable into multiple parts. The `strategy` generator yield a flat output containing values from `source` as well as special `split` sentinel values. `spliterate` decorates the values yielded from `strategy()`. Each instance of the `split` sentinel will yield a new part. Thus for a `strategy` which yields `split` `n` times, `n + 1` parts will be yielded.

Other methods in the split\* family (e.g. [splitOn](#spliton), [splitWhen](#splitwhen), and [bisect](#bisect)) are implemented using `spliterate` under the hood. It is expected that most use cases will be served by one of these existing methods. Their implementations also serve as useful examples.

Here is a slightly simplified implementation of [batch](#batch):

<!-- prettier-ignore -->
```js
function* batchStrategy(split { size }, source) {
  for (const [value, i] of enumerate(source)) {
    if (i % size === 0) yield split;
    yield value;
  }
}

const batch = spliterate(batchStrategy);

const iterable = [0, 'a', 1, 'b', 2, 'c'];

for (const [idx, letter] of batch({ size: 2 }, iterable)) {
  log(idx, letter);
}
// 0 a
// 1 b
// 2 c
```

Note: This method has only cursory Typecript support because Typescript lacks the power to describe it. Instead you should include your own type definitions. The example code with typedefs might look like this:

```js
function* batchStrategy<T>(
  split: symbol,
  options: { size: number },
  source: Iterable<T>,
) {
  // implementation is unchanged
}

function batch<T>(
  size: number,
  source: Iterable<T>,
): IterableIterator<IterableIterator<T>> {
  return spliterate(batchStrategy, { size }, source);
}
```

A final note: if you are creating a strategy which takes no options, it would be wise to bind an empty options object to avoid the confusion that iter-tools' partial application rules could cause.

```js
const mySpliterate = spliterate(myStrategy, {});
```
