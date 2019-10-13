Allows you to run an iterable through several functions. The first argument is an iterable, the following are functions that takes an iterable and return an iterable.

```js
const iter = execPipe(
  [1, 2, 3, 4],
  filter((x % 2) === 0)
  map((x) =>  x + 3),
)

iter // 5, 7
```

The previous example is equivalent to the `compose` and `pipe` ones (note that execPipe\* works left to right like `pipe`).
