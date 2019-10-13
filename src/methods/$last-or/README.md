Returns the last item in an iterable, or a default value if the iterable is empty. If the iterable is not an array, this requires traversing the whole iterable.

```js
lastOr(0, [1, 2, 3]); // 3
lastOr(0, []); // 0
```
