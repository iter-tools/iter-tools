fork returns an iterable that yields buffered proxies of the input iterable:

```js
const [proxy1, proxy2, proxy3] = fork(originalIterable);
// from now on originalIterable can't be used directly

// all the following return the same items that yielded by originalIterable
Array.from(proxy1);
Array.from(proxy2);
Array.from(proxy3);
```

This is highly useful because iterables do not guarantee that they may be iterated over more than once. Fork guarantees that you can iterate over its source as many times as you need to. It accomplishes this by caching values to the extent that it needs to.

It can also take as first argument the length of the iterable returned (the number of forks in other words).

```js
const proxies = fork(3, originalIterable);
```

And it can be curried:

```js
const proxies = fork(3)(originalIterable);
```

If you don't specify a number as first argument, fork's iterable of copies is infinite, so you can always create another fork on demand. However, while fork may still need to create another copy, it must keep a complete cache of all the data from the beginning of the source iterable. This means that in no circumstance may fork be used as a truly infinite iterable of infinte iterables without, well, infinite memory cost. For example:

```js
for (const proxy of fork(2, originalIterable)) {
  // if you consume proxy inside this loop
  // fork will cache every single item yielded by originalIterable
}
```

This is the recommended use of fork:

```js
// after this line, the cache will contain only the items not consumed by all iterables
const [proxy1, proxy2] = fork(originalIterable);

// That means that if I carefully consume all items in parallel, the memory cost will be minimal
const square = x => x * x;
for (const [n, nsquared] of zip(proxy1, map(square, proxy1))) {
  console.log(`${n} squared is ${nsquared}`);
}
```
