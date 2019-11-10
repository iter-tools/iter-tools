Allows nested calls to be flattened out for improved readability. `pipe(a, b, c)` is equivalent to `c(b(a))`, where `a`, `b`, and `c`, are functions. `pipe` is usually combined with curryied forms of other methods so that the `source` (or `iterable`) argument is passed between the composed methods.

```js
const filterMap = pipe(
  filter(x => x % 2 === 0),
  map(x => x + 1),
);

filterMap([0, 1, 2, 3, 4]); // Iterable[1, 3, 5]
```

Note: `pipe` is equivalent to [compose](#compose) but with inverted order of operations.
