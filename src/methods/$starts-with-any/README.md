Returns `true` if the first value in `source` is any `value` in `values`, as compared with `===`. Otherwise returns `false`.

```js
startsWithAny([0, 1], [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithAnySubseq](#startswithanysubseq). A warning will be emitted if you do not.
