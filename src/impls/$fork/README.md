Returns an iterable of `forks` of `source`. Each fork contains the same values as `source`, and can be consumed independently. This works even if `source` cannot itself be consumed more than once, for example because it is a generator. Values are buffered until they have been consumed by all forks. Each fork can only be consumed once. Note that fork caches values, and these cached values can never be released until `forks.return()` is called on the iterable of forks. If you are consuming `forks` using destructuring syntax (as in this example) or a `for..of` loop, this is done for you.

```js
const [forkA, forkB, forkC] = fork(function* () {
  yield 1;
  yield 2;
  yield 3;
});

forkA.next().value; // 1
forkB.next().value; // 1
forkC.next().value; // 1

forkA.next().value; // 2
forkB.next().value; // 2
forkC.next().value; // 2

forkA.next().value; // 3
forkB.next().value; // 3
forkC.next().value; // 3
```

**WARNING**

There is a really good chance that you'd be better off using `toArray` to cache an iterable instead of `fork`. `fork` is only better when you have multiple consumers of an infinite (or very large) iterable, and you are sure that they will be consuming in parallel.
