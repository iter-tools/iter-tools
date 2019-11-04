When `source` is empty, returns `null`, else yields the values from `source`. This is useful given that some iterables can be consumed only once, and even more cannot be relied on to repeat the same values on multiple iterations.

**Important:** If you do not need to consume the iterable returned from `nullOr`, you must instead use `isEmpty`. Otherwise you will leak an iterator so that its `return()` method will never be called.

```js
function renderData(data) {
  const nullOrData = nullOr(data); // You must make a variable. Calling nullOr(data) 2x would fail.
  return nullOrData ? joinAsStringWith(', ', nullOrData) : 'No data.';
}

function* generateData() {
  if (Math.random() > 0.5) {
    yield 1;
    yield 2;
    yield 3;
  }
}

renderData(generateData());
```

Note that `null` cannot be used with for loops. You can either use [forEach](#foreach) or `for (const value of wrap(nullOrIterable))`.
