It returns combinations of length n of an iterable. n defaults to the length of the iterable.
```js
combinations(range(2)); // [0, 1]
combinations(2, [1, 2, 3, 4]);
// returns:
// [ 1, 2 ],
// [ 1, 3 ],
// [ 1, 4 ],
// [ 2, 3 ],
// [ 2, 4 ],
// [ 3, 4 ]
```

You can get the number of items calling the method *getSize* without actually emitting the sequence:
```js
const iter = combinations([1, 2, 3, 4], 2);
iter.getSize() === 6
```
