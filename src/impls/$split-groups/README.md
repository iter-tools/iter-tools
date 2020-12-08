Eqivalent to `splitGroupsBy(_ => _, source)`. For more information see [splitGroupsBy](#splitgroupsby).

```js
splitGroups([1, 1, -1, -1, -1, 4, -1]);
// Iterable[
//   [1, Iterable[1, 1]]
//   [-1, Iterable[-1, -1, -1]]
//   [4, Iterable[4]]
//   [-1, Iterable[-1]]
// ]
```
