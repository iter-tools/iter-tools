This is a classic composition function that can be used to assemble multiple functions that take an iterable and return an iterable.
```js
const iter = compose(
  map((x) =>  x + 3),
  filter((x % 2) === 0)
)

iter([1, 2, 3, 4]) // 5, 7
```
Note: it works right to left, so the first transformation used is filter and the second is map.
