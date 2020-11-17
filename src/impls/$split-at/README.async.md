Synchronously yields two async `part` subsequences of `source`. The first `part` yields the values occurring before index `idx` in `source`, the second `part` yields all the values at or after index `idx`. `idx` can also be negative, in which case it refers to an offset from the end of `source`.

Like its sync counterpart, `asyncSplitAt` is also intended for use with destructuring assignment, and does not allow you to destructure only the first part.

```js
const [
  firstThree, // AsyncIterable[0, 1, 2]
  others, // AsyncIterable[3, 4, 5, 6, 7, 8, 9]
] = asyncSplitAt(3, asyncWrap(range(100)));

if (!othersNeeded) await others.return();

const [, lastThree] = asyncSplitAt(-3, range(10));
lastThree; // AsyncIterable[7, 8, 9]
```
