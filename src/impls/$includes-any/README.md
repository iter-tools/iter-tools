Defaults:

- `same`: `Object.is`

Returns `true` if `iterable` includes any of the specified `values`, or `false` otherwise. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
includesAny([0, 1], [1, 2, 3]); // true
includesAny([0, 1], [2, 3, 4]); // false
```

Note: If `source` is a string you should instead use [includesAnySeq](#includesanyseq). A warning will be emitted if you do not.
