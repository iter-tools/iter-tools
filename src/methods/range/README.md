Create an iterable returning a sequence of numbers (the sequence can be infinite).
Overloads are: `range({start, step, end})`, `range(end)`, or `range(start, step, end)`.

```js
range(); // 0, 1, 2 ... Infinity

range({ end: 3 }); // 0, 1, 2
range({ start: 3 }); // 3, 4, 5 ... Infinity
range({ start: 3, end: 6 }); // 3, 4, 5
range({ start: 3, end: 10, step: 3 }); // 3, 6, 9
range({ start: 9, end: 3, step: -3 }); // 9, 6

range(3); // 0, 1, 2
range(3, 6); // 3, 4, 5
range(3, 10, 3); // 3, 6, 9
```
