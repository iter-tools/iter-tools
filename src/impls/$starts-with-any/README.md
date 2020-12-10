Defaults:

- `same`: `Object.is`

Returns `true` if the first value in `source` is any `value` in `values`. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
startsWithAny([0, 1], [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithAnySeq](#startswithanyseq). A warning will be emitted if you do not.
