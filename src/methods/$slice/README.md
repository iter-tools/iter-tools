It returns an iterable that returns a slice of an iterable.
```js
slice(3, range(10)); // 0, 1, 2
slice({start: 2}, range(10)); // 2, 3, 4, 5, 6, 7, 8, 9
slice({start: 2, end: 6}, range(10)); // 2, 3, 4, 5
slice({start: 2, end: 6, step: 2}, range(10)); // 2, 4
```
"Start" and "end" can also be negative. They work like Array.prototype.slice. Note: working with negative indecies is less efficient and forces to buffer part of the sequence.
