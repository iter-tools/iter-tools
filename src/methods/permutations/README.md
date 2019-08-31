It returns permutations of length n of an iterable. n defaults to the length of the iterable.
```js
permutations(range(2)); // [0, 1] [1, 0]
permutations(2, [1, 2, 3, 4]);
// returns:
  // [ 1, 2 ],
  // [ 1, 3 ],
  // [ 1, 4 ],
  // [ 2, 1 ],
  // [ 2, 3 ],
  // [ 2, 4 ],
  // [ 3, 1 ],
  // [ 3, 2 ],
  // [ 3, 4 ],
  // [ 4, 1 ],
  // [ 4, 2 ],
  // [ 4, 3 ]
```

The number of items that will be yielded is accessable through a `size` property.
Note that the actual combinations are not computed in the example below
```js
permutations(range(2)).size === 2;
```
