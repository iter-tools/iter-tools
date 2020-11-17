Consumes values from `source` and `included` iterables in parallel, at each step yielding the `source` value if the `included` value is truthy.

```js
compress([0, 1, 2, 3, 4], [0, 0, 1, 1]); // 2, 3
compress([0, 1, 2, 3, 4], cycle([true, false])); // 0, 2, 4
```
