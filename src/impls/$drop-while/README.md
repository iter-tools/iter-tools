Returns values from `source`, omitting consecutive values at the beginning of `source` for which the result of `predicate(value, idx)` is truthy.

```js
dropWhile(isEven, range(5)); // 0, 2, 4
```
