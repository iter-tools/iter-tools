Yields two `part` subsequences of `source`. The first `part` yields the values occurring before index `idx` in `source`, the second `part` yields all the values at or after index `idx`.

```js
const [
  firstThree, // Iterable[0, 1, 2]
  others, // Iterable[3, 4, 5, 6, 7, 8, 9]
] = splitAt(3, range(100));
```

If you consume the sequences in order the method works in place, however if you consume the second subsequence before the first then the values from the first subsequence must be buffered.
