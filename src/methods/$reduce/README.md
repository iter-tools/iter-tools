This is an implementation of the reduce that consumes an iterable instead of an array (have a look at Array.prototype.reduce).
It takes as arguments an initial value (optional), a function, and an iterable.
If an initial value is not specified, the first item is used as the initial value
```js
reduce(0, (acc, v) => acc += v, range(4)); // 6
reduce((acc, v) => acc += v, range(4)); // 6
```
