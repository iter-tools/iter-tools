It returns combinations with replacement of length n of an iterable. n defaults to the length of the iterable.

```js
combinationsWithReplacement(range(2)); // [0, 0] [0, 1] [1, 1]
combinationsWithReplacement(2, [1, 2, 3, 4]);
// returns:
// [ 1, 1 ],
// [ 1, 2 ],
// [ 1, 3 ],
// [ 1, 4 ],
// [ 2, 2 ],
// [ 2, 3 ],
// [ 2, 4 ],
// [ 3, 3 ],
// [ 3, 4 ],
// [ 4, 4 ]
```

The number of items that will be yielded is accessable through a `size` property.
Note that the actual combinations are not computed in the example below

```js
combinationsWithReplacement([1, 2, 3, 4], 2).size === 10;
```
