Yields two `part` subsequences of `source`. The split position is chosen with `at`. If `at` is a number, the first part will contain that number of values. If `at` is a negative number the second part will contain that number of values. If `at` is a function the split will be before the first `value` for which the result of `at(value, idx)` is truthy.

`bisect` is specially designed to work with destructuring, but this comes at a cost: for resources to be released properly you must use the second half of the split. If you only need the first half you must instead use [take](#take) or [takeWhile](#takewhile). For example instead of `const [seq] = bisect(cond, source)` you must write `const seq = takeWhile((v, i) => !cond(v, i), source)`.

```js
const source = [-2, -1, 0, 1, 2];
const [negatives, positives] = bisect(
  (i) => i >= 0,
  source,
);
negatives; // Iterable[-2, -1]
positives; // Iterable[0, 1, 2]

const [
  firstThree, // Iterable[0, 1, 2]
  others, // Iterable[3, 4, 5, 6, 7, 8, 9]
] = bisect(3, range(10));

const [, lastThree] = bisect(-3, range(10));
lastThree; // Iterable[7, 8, 9]
```
