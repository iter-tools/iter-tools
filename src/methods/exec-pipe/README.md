`execPipe(inital, ...fns)` is sugar for `pipe(...fns)(initial)`. See [pipe](#pipe)

```js
execPipe(
  [0, 1, 2, 3, 4],
  filter(x => x % 2 === 0)
  map(x => x + 1),
); // Iterable[1, 3, 5]
```
