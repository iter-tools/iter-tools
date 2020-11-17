Returns `true` if all `iterables` are equal to each other, and `false` otherwise. Only considers the values yielded by the iterables, which it compares with `===`.

```js
equals([1, 2, 3], [1, 2, 3], [1, 2, 3]); // true
equals([1, 2, 3], [3, 2, 1]); // false
```
