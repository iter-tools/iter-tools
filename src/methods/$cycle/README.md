Defaults:

- `n`: `Infinity`

Yields the contents of `iterable` repeated `n` times.

```js
cycle(2, range(3)); // Iterable[0, 1, 2, 0, 1, 2]
cycle(range(3)); // Iterable[0, 1, 2, 0, 1, 2, 0, 1, 2, ...]
```
