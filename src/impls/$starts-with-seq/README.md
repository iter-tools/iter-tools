Defaults:

- `same`: `Object.is`

Returns `true` if the first subsequence of values in `source` matches `valueSeq`. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
startsWithSeq([1, 2], [1, 2, 3]); // true
```
