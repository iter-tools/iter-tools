This is a classic composition function that can be used to assemble multiple functions that take an iterable and return an iterable.
```js
const iter = pipe(
  filter((x % 2) === 0),
  map((x) =>  x + 3)
)

iter([1, 2, 3, 4]) // 5, 7
```
Note: it is equivalent to *compose* but it works left to right!
