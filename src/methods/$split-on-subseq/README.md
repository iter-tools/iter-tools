Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters a sequence of specified items. When a separator subsequence is matched, it consumes all the matched items, which may not then be used as part of another separator subsequence.

```js
splitOnSubseq([0, 0], [1, 0, 0, 2, 0, 0, 3]) // Iterable[[1], [2], [3]]
```
