Returns the first item in `iterable` for which `predicate(item, idx)` returns a truthy value, or `notFoundValue` if no item satisfied the predicate.

```js
findOr(0, (x) => x > 10, [1, 2, 3]); // 0
```
