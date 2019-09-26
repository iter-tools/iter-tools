Splits an iterable into multiple subsequences, generating a new subsequence each time it encounters any of the specified sequences of items. When a separator subsequence is matched, it consumes all the matched items, which may not then be used as part of any other separator subsequence.

```js
splitOnAnySubseq(
  [
    ['\r\n'],
    ['\n'],
  ],
  'mixed\r\nline\nterminators'
) // Iterable['mixed', 'line', 'terminators']
```
