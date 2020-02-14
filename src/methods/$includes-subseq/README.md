Retuns `true` if the `subseq` (subsequence) of values can be found somewhere in `iterable`, or `false` otherwise. Two values are considered equivalent if the result of `compare(a, b)` is truthy. The default `compare` method is `Object.is`.

```js
includesSubseq([1, 2], [1, 2, 3]); // true
includesSubseq([1, 2, 3], [1, 2, 3]); // true
includesSubseq([2, 3, 4], [1, 2, 3]); // false
```
