Takes an iterable and returns n biggest items sorted from the smallest (the nth order statistic) to the biggest. The function is both space efficient (only stores n items) and fast O(m log n), given m as the total items yielded by the iterable. It uses a heap internally.

```js
takeSorted(3, [4, 5, 2, 3, 1]); // Iterable[1, 2, 3]
takeSorted([4, 5, 2, 3, 1]); // Iterable[1, 2, 3, 4, 5]
```

It can take as a optional comparator argument which has the same semantics as the one taken by `Array.prototype.sort`.

```js
takeSorted(3, (a, b) => b - a, [4, 5, 2, 3, 1]); // Iterable[5, 4, 3]
```
