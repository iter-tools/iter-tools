Retuns `true` if `iterable` includes any of the specified `values`, or `false` otherwise. Two values are considered equivalent if the result of `compare(a, b)` is truthy. The default `compare` method is `Object.is`.

```js
includesAny([0, 1], [1, 2, 3]); // true
includesAny([0, 1], [2, 3, 4]); // false
```
