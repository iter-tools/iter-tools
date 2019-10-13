It cycles the same iterable `n` times, or forever if `n` is not specified.

```js
cycle(2, range(3)); // 0, 1, 2, 0, 1, 2
cycle(range(3)); // 0, 1, 2, 0, 1, 2, 0, 1, 2 ....
```
