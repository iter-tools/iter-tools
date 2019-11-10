Defaults:

`n`: `size(iterable)`

Yields combinations of length `n` of values from `iterable`, allowing replacement.

```js
combinationsWithReplacement([0, 1]); // Iterable[[0, 0] [0, 1] [1, 1]]
combinationsWithReplacement(2, [1, 2, 3, 4]);
// Iterable[
//   [ 1, 1 ],
//   [ 1, 2 ],
//   [ 1, 3 ],
//   [ 1, 4 ],
//   [ 2, 2 ],
//   [ 2, 3 ],
//   [ 2, 4 ],
//   [ 3, 3 ],
//   [ 3, 4 ],
//   [ 4, 4 ]
// ]
```

The number of items that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
combinationsWithReplacement(2, [1, 2, 3, 4]).size === 10;
```
