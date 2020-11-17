Consumes each `source` in `sources` in parallel, at each step yielding an array with one value from every `source`. Stops when the shortest source iterable is exausted.

```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```
