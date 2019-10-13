It returns true if the predicate returns true for every item in the iterable.

```js
every(n => n % 2 === 0, [1, 2, 3]); // returns false
every(n => n % 2 === 0, [2, 4, 6]); // returns true
```
