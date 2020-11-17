Defaults:

- `start`: 0
- `end`: Infinity
- `step`: 1

Create an iterable returning a sequence of numbers (the sequence can be infinite).

```js
range(); // 0, 1, 2 ... Infinity
range(3); // 0, 1, 2
range(3, 6); // 3, 4, 5
range(3, 10, 3); // 3, 6, 9
range(9, 3, -3 }); // 9, 6

range({ end: 3 }); // 0, 1, 2
range({ start: 3 }); // 3, 4, 5 ... Infinity
range({ start: 3, end: 6 }); // 3, 4, 5
range({ start: 3, end: 10, step: 3 }); // 3, 6, 9
```
