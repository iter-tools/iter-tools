On each iteration it returns a key and a sub-iterable of items with that key.
You can pass a function that returns a key, if you pass null or undefined an identity function will be used.
When you iterate over the next group, the previous sub-iterable items will not be available anymore.
Note: it groups **adjecents** items returning the same key.

```js
groupBy(
  value => {
    value * value;
  },
  [1, 1, 1, 1, -1, -1, -1, 4],
);
// It will return:
// 1, subiterator (1, 1, 1, 1, -1, -1, -1)
// 16, subiterator (4)
```
