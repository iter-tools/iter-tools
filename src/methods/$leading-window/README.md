Defaults:

- `filler`: `undefined`

For every value in `source`, yields an iterable `window` of size `size` which starts with that value and also contains the next values from `source`. The `window` instance is the same on every iteration. When there are not enough additional values in `source` to fill the window, `filler` will be used in place of the missing values.

```js
leadingWindow(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5, undefined]
//   Iterable[5, undefined, undefined]
// ]

leadingWindow(3, { filler: Infinity }, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
//   Iterable[4, 5, Infinity]
//   Iterable[5, Infinity, Infinity]
// ]
```
