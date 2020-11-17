Defaults:

`n`: `Infinity`

Returns an iterable of `n` forks of `source`. Each fork contains the same values as `source`, and can be consumed independently. This works even if `source` cannot itself be consumed more than once, for example because it is a generator. Values are buffered until they have been consumed by all forks. Each fork can only be consumed once.

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

There is a really good chance that you'd be better off using `toArray` to cache an iterable instead of `fork`. `fork` is only better when you have a known, finite number of consumers of an infinite (or very large) iterable, and in particular when your consumers consume in parallel. These conditions will be rare, and if they are not met, `fork` will end up being slower and using more memory than `toArray` anyway.

If your use case does satisfy the above conditions, be sure that `fork` understands how many consumers to create, either by using `slice` or destructuring on the forks iterable, or by passing the `n` argument to `fork`.
