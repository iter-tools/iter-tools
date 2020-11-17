Facilitates the creation of methods which split a `source` iterable into multiple keyed groups. The `strategy` generator yield a flat output containing values from `source` as well as special `split` sentinel values. `spliterate` decorates the values yielded from `strategy()`. Each instance of the `split` sentinel starts a new group. The value immediately following a `split` is the key for the group. This means that a `strategy` which yields `split` `n` times, `n` groups will be yielded.

[groupBy](#groupby) is implemented using `spliterateGrouped` under the hood. It is expected that most use cases will be served by using that method instead.

Included as an example is a lightly edited version of the implementation of `groupBy`. It is expected that in the vast majority of circumstances it will be correct to use the actual [groupBy](#groupby) method and not this one.

<!-- prettier-ignore -->
```js
function* groupingSpliterator(split, { getKey }, source) {
  const peekr = peekerate(source);
  let key = Symbol();

  while (!peekr.done) {
    const lastKey = key;

    key = getKey(peekr.value);

    if (lastKey !== key) {
      yield split;
      yield key;
    }

    yield peekr.value;

    peekr.advance();
  }
}

function groupBy(source, getKey) {
  return spliterateGrouped({ getKey }, source);
}
```

Note: This method has only cursory Typecript support because Typescript lacks the power to describe it. Instead you should include your own type definitions. The example code with typedefs might look like this:

```js
function* groupingSpliterator<T>(
  split: symbol,
  options: { getKey: Function },
  source: Iterable<T>,
) {
  // implementation is unchanged
}

function groupBy<K, T>(
  getKey: (value: T) => K,
  source: Iterable<T>,
): IterableIterator<[K, IterableIterator<T>]> {
  return spliterateGrouped(
    groupingSpliterator,
    { getKey },
    source,
  );
}
```

A final note: if you are creating a strategy which takes no options, it would be wise to bind an empty options object to avoid the confusion that iter-tools' partial application rules could cause.

```js
const mySpliterate = spliterate(myStrategy, {});
```
