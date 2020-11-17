For values in `source`, yields a `window` iterable of size `size` which starts with that value and also contains the next values from `source`. The `window` instance is the same on every iteration. Only emits full windows, which means fewer windows will be emitted than there are items in `source`. If you need a window for every item in `source`, use [leadingWindow](#leadingwindow) or [trailingWindow](#trailingwindow).

```js
window(3, [1, 2, 3, 4, 5]);
// Iterable[
//   Iterable[1, 2, 3],
//   Iterable[2, 3, 4]
//   Iterable[3, 4, 5]
// ]

window(5, [1, 2, 3]);
// Iterable[]
```
