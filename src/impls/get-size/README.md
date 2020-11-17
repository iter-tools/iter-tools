Returns the size of `sequence` as determined by accessing `length` if `Array.isArray(sequence)`, or `sequence.size` otherwise. The size of `null` or `undefined` is `0`. Throws an error if a numeric size cannot be found in this way. If you have an iterable with no cached size you should instead use [size](#size).

```js
getSize([1, 2, 3]); // 3
getSize(new Map([1, 2, 3])); // 3
getSize(null); // 0
```
