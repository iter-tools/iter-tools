Defaults:

- `selector`: `value => value`

Yields values from `source`, omitting any values that are duplicates of those already yielded. A value is considered a duplicate if `Object.is(selector(a), selector(b))`. A `Set` is used to do this check efficiently.

```js
distinct([0, 1]); // Iterable[0, 1]
distinct([1, 2, 1, 2, 3]); // Iterable[1, 2, 3]
distinct((x) => x[0], ['apple', 'apricot', 'blueberry']); // Iterable['apple', 'blueberry']
```
