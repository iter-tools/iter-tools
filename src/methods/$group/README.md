Eqivalent to `groupBy(_ => _, source)`. For more information see [groupBy](#groupby).

```js
group([1, 1, -1, -1, -1, 4, -1]);
// Iterable[
//   [1, Iterable[1, 1]]
//   [-1, Iterable[-1, -1, -1]]
//   [4, Iterable[4]]
//   [-1, Iterable[-1]]
// ]
```
