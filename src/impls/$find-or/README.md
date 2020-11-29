Returns the first value in `iterable` for which `predicate(value, idx)` returns a truthy value, or `notFoundValue` if no value satisfied the predicate.

```js
findOr(0, (x) => x > 10, [1, 2, 3]); // 0
```
