Returns values from `source`, starting at the beginning up until the first value for which the result of `predicate(value, idx)` is falsy.

```js
takeWhile(isEven, [2, 4, 1, 3]); // Iterable[2, 4]
takeWhile(isEven, [1, 2, 3, 4]); // Iterable[]
```
