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
It can be curried:
```js
const permutation2 = permutations(2)
permutation2([1, 2, 3, 4]);
```
You can get the number of items calling the method *getSize* without actually emitting the sequence:
```js
const iter = permutations(range(2)); // [0, 1] [1, 0]
iter.getSize() === 2
```
