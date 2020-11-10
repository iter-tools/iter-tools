Yields `value` between each of the values in `source`.

```js
interpose(null, [1, 2, 3]); // Iterable[1, null, 2, null, 3]
```

Note: If `source` is a string you should instead use [interposeSubseq](#interposesubseq). A warning will be emitted if you do not.
