Defaults:

- `filler`: `undefined`

Consumes each `source` in `sources` in parallel, at each step yielding an array with one value from every `source`. Stops when the shortest source iterable is exausted. Where some `sources` are exhausted before all `sources` are exchausted, `filler` will be used in place of the missing values.

```js
zipAll([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6], [undefined, undefined, 7]
zipAll({ filler: null }, [1, 2], []); // [1, null], [2, null]
```
