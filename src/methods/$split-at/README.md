Yields two `part` subsequences of `source`. The first `part` yields the values occurring before index `idx` in `source`, the second `part` yields all the values at or after index `idx`. `idx` can also be negative, in which case it refers to an offset from the end of `source`.

`splitAt` is specially designed to work with destructuring, which makes it unique among the split family (its result is **not** a [PartsIterable](#partsiterable)). However this comes with a condition: you must not destructure only the first part of the split, as in `const [firstThree] = splitAt(3, iterable)`. Instead you would write `const firstThree = take(3, iterable)`.

```js
const [
  firstThree, // Iterable[0, 1, 2]
  others, // Iterable[3, 4, 5, 6, 7, 8, 9]
] = splitAt(3, range(10));

if (!othersNeeded) {
  // If there is a condition in which you do not need the second half of the split
  // you must call return manually or any underlying resouces would not be released
  others.return();
}

const [, lastThree] = splitAt(-3, range(10));
lastThree; // Iterable[7, 8, 9]
```
