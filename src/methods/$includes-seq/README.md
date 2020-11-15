Retuns `true` if the `seq` (subsequence) of values can be found somewhere in `iterable`, or `false` otherwise. Compares values with `===`.

```js
includesSeq([1, 2], [1, 2, 3]); // true
includesSeq([1, 2, 3], [1, 2, 3]); // true
includesSeq([2, 3, 4], [1, 2, 3]); // false
```
