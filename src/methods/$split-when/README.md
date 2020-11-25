Yields two `part` subsequences of `source`. The first `part` yields the values where `predicate(value, i)` is falsy. The second `part` yields all the values including and after the first value for which `predicate(value, i)` is truthy.

`splitAt` is specially designed to work with destructuring, but this comes at a cost: for resources to be released properly you must use the second half of the split. If you only need the first half you would instead use [takeWhen](#takewhen), e.g. by changing `const [seq] = splitWhen(cond, source)` into `const seq = takeWhen((v, i) => !cond(v, i), source)`.

```js
const source = [-2, -1, 0, 1, 2];
const [negatives, positives] = splitWhen(
  (i) => i >= 0,
  source,
);
negatives; // Iterable[-2, -1]
positives; // Iterable[0, 1, 2]
```
