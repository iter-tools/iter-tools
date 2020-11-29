This returns the [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of two or more `iterables`.

```js
product([1, 2], [3, 4], [5, 6]);
// Iterable [
//   [1, 3, 5],
//   [1, 3, 6],
//   [1, 4, 5],
//   [1, 4, 6],
//   [2, 3, 5],
//   [2, 3, 6],
//   [2, 4, 5],
//   [2, 4, 6]
// ]

// You can use fork to get the prodcut of an iterable with itself.
product(...fork(2, [0, 1])); // Iterable[[0, 0], [0, 1], [1, 0], [1, 1]]
```

The number of values that will be yielded is accessible through a `size` property.
Note that the actual combinations are not computed in the example below

```js
product([1, 2], [3, 4], [5, 6]).size === 8;
```
