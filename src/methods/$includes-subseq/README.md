Retuns `true` if the `subseq` (subsequence) of values can be found somewhere in `iterable`, or `false` otherwise. Compares values with `===`.

```js
includesSubseq([1, 2], [1, 2, 3]); // true
includesSubseq([1, 2, 3], [1, 2, 3]); // true
includesSubseq([2, 3, 4], [1, 2, 3]); // false
```
