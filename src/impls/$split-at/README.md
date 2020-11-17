Yields two `part` subsequences of `source`. The first `part` yields the values occurring before index `idx` in `source`, the second `part` yields all the values at or after index `idx`. `idx` can also be negative, in which case it refers to an offset from the end of `source`.

`splitAt` is specially designed to work with destructuring, but this comes at a cost: for resources to be released properly you must use the second half of the split. If you only need the first half you would instead use [take](#take), e.g. by changing `const [seq] = splitAt(i, source)` into `const seq = take(i, source)`.

```js
const [
  firstThree, // Iterable[0, 1, 2]
  others, // Iterable[3, 4, 5, 6, 7, 8, 9]
] = splitAt(3, range(10));

const [, lastThree] = splitAt(-3, range(10));
lastThree; // Iterable[7, 8, 9]
```
