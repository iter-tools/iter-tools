`nullOrAsync` has a different call pattern than any other method in the library. It returns a Promise resolving to either `null` (if `source` is empty) or an [AsyncIterable](#asyncresultiterable) containing the values from `source`.

```js
async function renderData(data) {
  const nullOrData = await nullOr(data); // Note the await here. This would usually be unnecessary.
  return nullOrData ? await asyncJoinAsStringWith(', ', nullOrData) : 'No data.';
}

async function* generateAsyncData() {
  // ...
}

await renderData(generateAsyncData());
```

Note that `null` cannot be used with for loops. You can either use [asyncForEach](#asyncforeach) or `for await (const value of asyncWrap(nullOrIterable))`.
