Defaults:

- `same`: `Object.is`

Returns `true` if the first value in `source` is `value`. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
startsWith(1, [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithSeq](#startswithseq). A warning will be emitted if you do not.
