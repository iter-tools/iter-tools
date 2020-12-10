Defaults:

- `same`: `Object.is`

Returns `true` if the `seq` (subsequence) of values can be found somewhere in `iterable`, or `false` otherwise. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
includesSeq([1, 2], [1, 2, 3]); // true
includesSeq([1, 2, 3], [1, 2, 3]); // true
includesSeq([2, 3, 4], [1, 2, 3]); // false
```
