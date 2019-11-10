Yields `part` subsequences of `source`, generating a new `part` each time it encounters a subsequence of values matching any `separatorSubseq` in the `separatorSubseqs` iterable. Each value in a `separatorSubseq` must match using `===`. When a `separatorSubseq` is matched, all matched values are consumed from `source`. They will not appear in any `part`, nor may they be part of any other `separatorSubseq` match.

```js
splitOnAnySubseq(
  [['\r\n'], ['\n']],
  'mixed\r\nline\nterminators',
); // Iterable['mixed', 'line', 'terminators']
```
