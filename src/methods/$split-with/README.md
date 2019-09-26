Splits a sequence into multiple subsequences by running a predicate function against each item in the original. The splits occur where the predicate returns a truthy value, and the items which match the predicate will not be in any of the output subsequences

```js
splitWith(x => x == null, [1, null, 2, undefined, 3]) // Iterable[Iterable[1], Iterable[2], Iterable[3]]
```
