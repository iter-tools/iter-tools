Retuns `true` if any of the the `subseqs` (subsequences) of values can be found somewhere in `iterable`, or `false` otherwise. Two values are considered equivalent if the result of `compare(a, b)` is truthy. The default `compare` method is `Object.is`.

```js
includesAnySubseq([[1, 2], [2, 3]], [1, 2, 3]); // true
includesAnySubseq([[2, 3], [3, 4]], [1, 2, 3]); // true
includesAnySubseq([[0, 1], [3, 4]], [1, 2, 3]); // false
```
