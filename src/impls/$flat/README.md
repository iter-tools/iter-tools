Defaults:

- `depth`: `1`
- `shouldFlat`: `value => isIterable(value) && !isString(value)`

Yields each nested value from `source` by recursing into values which are iterable -- up to the maximum recursion `depth`. In additon to checking `depth`, `flat` will only recurse if the result of `shouldFlat(value)` is truthy.

<!-- prettier-ignore -->
```js
const nested = [
  1,
  [2, 3],
  [
    4,
    [5, 6]
  ]
];
flat(nested); // Iterable[1, 2, 3, 4, Iterable[5, 6]]
flat(2, nested); // Iterable[1, 2, 3, 4, 5, 6]

const isString = value =>
  typeof value === 'string' && value.length > 1;

flat(isString, Infinity, ['Hel', ['lo', '!']]); // Iterable['H', 'e', 'l', 'l', 'o', '!]
```
