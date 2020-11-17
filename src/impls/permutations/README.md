Defaults:

`n`: `size(iterable)`

Yields permutations of length `n` of items from `iterable`.

```js
permutations([0, 1]); // Iterable[[0, 1] [1, 0]]
permutations(2, [1, 2, 3, 4]);
// Iterable[
//   [ 1, 2 ],
//   [ 1, 3 ],
//   [ 1, 4 ],
//   [ 2, 1 ],
//   [ 2, 3 ],
//   [ 2, 4 ],
//   [ 3, 1 ],
//   [ 3, 2 ],
//   [ 3, 4 ],
//   [ 4, 1 ],
//   [ 4, 2 ],
//   [ 4, 3 ]
// ]
```

The number of items that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
permutations([0, 1]).size === 2;
```
