This returns the cartesian product of 2 or more iterables. It is equivalent to a nested loop for every iterable.
```js
product([1, 2], [3, 4], [5, 6]);
// returns:
// [1, 3, 5],
// [1, 3, 6],
// [1, 4, 5],
// [1, 4, 6],
// [2, 3, 5],
// [2, 3, 6],
// [2, 4, 5],
// [2, 4, 6]

// You can use fork for multiplying the same iterable for itself.
product(...fork(2, range(2))); // [0, 0]  [0, 1]  [1, 0]  [1, 1]
```
The number of items that will be yielded is accessable through a `size` property.
Note that the actual combinations are not computed in the example below
```js
product([1, 2], [3, 4], [5, 6]).size === 8;
```
