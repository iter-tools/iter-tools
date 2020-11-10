Returns `true` if the first value in `source` is `value`, as compared with `===`. Otherwise returns `false`.

```js
startsWith(1, [1, 2, 3]); // true
```

Note: If `source` is a string you should instead use [startsWithSubseq](#startswithsubseq). A warning will be emitted if you do not.
