Retuns `true` if `iterable` includes the specified `value`, or `false` otherwise. Two values are considered equivalent if the result of `compare(a, b)` is truthy. The default `compare` method is `Object.is`.

```js
includes(2, [1, 2, 3]); // true
includes(0, [1, 2, 3]); // false
```
