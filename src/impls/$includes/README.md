Defaults:

- `same`: `Object.is`

Returns `true` if `iterable` includes the specified `value`, or `false` otherwise. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
includes(2, [1, 2, 3]); // true
includes(0, [1, 2, 3]); // false
```

Note: If `source` is a string you should instead use [includesSeq](#includesseq). A warning will be emitted if you do not.
