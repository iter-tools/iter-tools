Retuns `true` if any of the the `seqs` (subsequences) of values can be found somewhere in `iterable`, or `false` otherwise. Compares values with `===`.

```js
includesAnySeq(
  [
    [1, 2],
    [2, 3],
  ],
  [1, 2, 3],
); // true
includesAnySeq(
  [
    [2, 3],
    [3, 4],
  ],
  [1, 2, 3],
); // true
includesAnySeq(
  [
    [0, 1],
    [3, 4],
  ],
  [1, 2, 3],
); // false
```
