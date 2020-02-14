Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSubseqs` are used to mark the boundary between parts in `source`. When any `separatorSubseq` in `separatorSubseqs` is matched, all matched values are consumed from `source` and will not appear in any `part`, nor may they be part of any other `separatorSubseq` match. Matches greedily, which is to say the longest possible separator match will be prioritized.

```js
splitOnAnySubseq(
  [['\n'], ['\r\n']],
  'mixed\r\nline\nterminators',
); // Iterable['mixed', 'line', 'terminators']
```
