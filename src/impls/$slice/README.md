Defaults:

- `end`: `Infinity`
- `step`: `1`

Yields a subsequence of items from `source`, starting at index `start` then advancing `step` items, until it reaches index `end`. The item at index `end` will not be part of the result.

```js
slice(0, 3, range(10)); // Iterable[0, 1, 2]
slice(2, range(10)); // Iterable[2, 3, 4, 5, 6, 7, 8, 9]
slice(2, 6, range(10)); // Iterable[2, 3, 4, 5]
slice(2, 6, 2, range(10)); // Iterable[2, 4]
```

`start` and `end` can also be negative. When they are, they refer to offsets from the end of `iterable`, as they do in `Array.prototype.slice`. `step` must not be negative.

```js
slice(0, -3, range(10)); // Iterable[0, 1, 2, 3, 4, 5, 6]
slice(-3, range(10)); // Iterable[7, 8, 9]
slice(-6, -2, range(10)); // Iterable[4, 5, 6, 7]
slice(-6, -2, 2, range(10)); // Iterable[4, 6]
```

Note: working with negative indicies does force `slice` to buffer items while it looks for the end of `iterable`. It will do this as efficiently as it can, but for this reason it is not a good idea to use really large negative indexes.

When no arguments are passed to `slice` it is functionally equivalent to `wrap`.
