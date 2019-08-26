ZipAll receives 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the longest iterable is exausted. If an iterable is exhausted, it is returning undefined, or the value specified in the `filler` option. Note that filler cannot be specified as a positional argument.

```js
zipAll([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [undefined, undefined, 7]
zipAll({filler: null}, [1, 2], []); // [1, null], [2, null]
```
