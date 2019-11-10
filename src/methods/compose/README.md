Allows nested calls to be flattened out for improved readability. `compose(a, b, c)` is equivalent to `a(b(c))`, where `a`, `b`, and `c`, are functions. `compose` is usually combined with curryied forms of other methods so that the `source` (or `iterable`) argument is passed between the composed methods.

```js
const filterMap = compose(
  map(x => x + 1),
  filter(x => x % 2 === 0),
);

filterMap([0, 1, 2, 3, 4]); // Iterable[1, 3, 5]
```

Note: If seems backwards to you that `filter` appears below `map` yet runs first, you're probably looking for [pipe](#pipe).
