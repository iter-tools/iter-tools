Defaults:

- `filler`: `undefined`

For every value in `source`, yields a `window` iterable of size `size` which contains the values leading up to and including that value. The `window` instance is the same on every iteration. When there are not enough prior values to fill the window, `filler` will be used in place of the missing values.

```js
trailingWindow(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[undefined, undefined, 1],
//   Iterable[undefined, 1, 2]
//   Iterable[1, 2, 3]
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
// ]

trailingWindow(3, { filler: 0 }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[0, 0, 1]
//   Iterable[0, 1, 2]
//   Iterable[1, 2, 3]
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
// ]
```
