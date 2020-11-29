Returns `true` if the result of `predicate(value, idx)` is truthy for at least one value in `iterable`, and `false` otherwise.

```js
some(isEven, [1, 2, 3]); // true
some(isEven, [1, 3, 7]); // false
```
