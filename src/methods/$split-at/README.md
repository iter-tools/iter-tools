It returns an iterable containing 2 slices of the input iterable. The first spans from the beginning to the chosen position. The second from the chosen position to the end.

```js
const [firstThree, others] = splitAt(3, range(100));
Array.from(firstThree); // [0, 1, 2]
Array.from(others); // [3, 4, 5, 6, 7, 8, 9]
```

Memory-wise, the two iterables try to be as conservative as possible. But you have to take into consideration that consuming the second iterable without having consumed the first will keep the content of the first iterable in memory.
