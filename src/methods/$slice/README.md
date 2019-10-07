It returns an iterable that returns a slice of an iterable.

```js
slice(3, range(10)); // 0, 1, 2
slice({ start: 2 }, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({ start: 2, end: 6 }, range(10)); // 2, 3, 4, 5
slice({ start: 2, end: 6, step: 2 }, range(10)); // 2, 4
```

`start` and `end` can also be negative. When they are, they refer to offsets from the end of the iterable, as they do in `Array.prototype.slice`. Note: working with negative indicies does force slice to buffer items while it looks for the end of the iterable. It will do this as efficiently as it can, but for this reason it is not a good idea to use really large negative indexes.

When no arguments are passed to `slice` it is functionally equivalent to `wrap`.
