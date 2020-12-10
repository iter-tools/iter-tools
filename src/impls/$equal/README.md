Defaults:

- `same`: `Object.is`

Returns `true` if all `iterables` consist of the same sequence of values. Otherwise returns `false`. Two values are considered to be the same if the result of `same(a, b)` is truthy.

```js
equal([1, 2, 3], [1, 2, 3], [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithSeq](#startswithseq). A warning will be emitted if you do not.
