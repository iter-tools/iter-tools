Returns `true` if, for every value in `source`, the result of `predicate(item, idx)` is truthy. Otherwise returns `false`.

```js
every(isEven, [1, 2, 3]); // returns false
every(isEven, [2, 4, 6]); // returns true
```
