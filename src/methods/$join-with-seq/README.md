Given `source`, an iterable of iterables, yields all values from each iterable with the `separatorSeq` values in between. It is the inverse of `splitOnSeq`.

```js
joinWithSeq([null, null], [[1], [2], [3]]); // Iterable[1, null, null, 2, null, null, 3]
```
