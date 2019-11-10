Defaults:

- `initial`: `first(iterable)`

Turns `iterable` into a single `result` value using a reducer function. For each `value` in `iterable`, calls `reducer(result, value, idx)`, where result `result` is either the `initial` for the first value in `iterable`, otherwise the value returned from the last call to `reducer`. It is equivalent to `Array.prototype.reduce`.

```js
reduce(0, (result, v) => result + v, [1, 2, 3]); // 6
reduce(10, (result, v) => result + v, [1, 2, 3]); // 16
reduce((result, v) => result + v, [1, 2, 3]); // 6
```
