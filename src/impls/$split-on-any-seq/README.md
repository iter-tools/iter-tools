Yields a [PartsIterable](#partsiterable) of parts from `source`, where `separatorSeqs` are used to mark the boundary between parts in `source`. When any `separatorSeq` in `separatorSeqs` is matched, all matched values are consumed from `source` and will not appear in any `part`, nor may they be part of any other `separatorSeq` match. Matches greedily, which is to say the longest possible separator match will be prioritized. Each value in a `separatorSeq` is compared using `===`.

```js
splitOnAnySeq(
  [['\n'], ['\r\n']],
  'mixed\r\nline\nterminators',
); // Iterable['mixed', 'line', 'terminators']
```
