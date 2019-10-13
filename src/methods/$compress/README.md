This returns an iterable omitting items when the second iterable, at the same index, contains a falsy value.

```js
compress(range(5), [0, 0, 1, 1]); // 2, 3
```
