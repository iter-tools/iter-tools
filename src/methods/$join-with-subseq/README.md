It expects to receive an iterable of iterables to be joined, and a separator subsequence. It yields all items of each joined iterable, with the items of the separator in between. It is the inverse of `splitWithSubseq`.

```js
joinWithSubseq([null, null], [[1], [2], [3]]) // Iterable[1, null, null, 2, null, null, 3]
```
