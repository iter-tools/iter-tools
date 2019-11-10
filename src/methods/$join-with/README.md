Given `source`, an iterable of iterables, yields all values from each iterable with `separator` in between. It is the inverse of `splitOn`.

```js
joinWith(null, [[1], [2], [3]]); // Iterable[1, null, 2, null, 3]
```
