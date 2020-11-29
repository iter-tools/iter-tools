Defaults:

- `end`: `Infinity`
- `step`: `1`

Yields a subsequence of values from `source`, starting at index `start` then advancing `step` values, until it reaches index `end`. The value at index `end` will not be part of the result.

```js
slice(0, 3, range(10)); // Iterable[0, 1, 2]
slice(2, range(10)); // Iterable[2, 3, 4, 5, 6, 7, 8, 9]
slice(2, 6, range(10)); // Iterable[2, 3, 4, 5]
slice(2, 6, 2, range(10)); // Iterable[2, 4]
```

`start` and `end` can also be negative. When they are, they refer to offsets from the end of `iterable`, as they do in `Array.prototype.slice`. This will always require consuming the entire iterable to figure out where the end is. `step` must not be negative.

```js
slice(0, -3, range(10)); // Iterable[0, 1, 2, 3, 4, 5, 6]
slice(-3, range(10)); // Iterable[7, 8, 9]
slice(-6, -2, range(10)); // Iterable[4, 5, 6, 7]
slice(-6, -2, 2, range(10)); // Iterable[4, 6]
```

When no arguments are passed to `slice` it is functionally equivalent to `wrap`.
