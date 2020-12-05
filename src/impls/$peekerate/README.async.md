See [peekerate](#peekerate)

Note: Returns a promise of a peekerator, which is necessary for the first value to be fetched.

```js
function asyncPrintValues(values) {
  const peekr = await asyncPeekerate(values);

  return peekr.done
    ? 'none'
    : stringFromAsync(
        asyncInterposeSeq(', ', peekr.asIterator()),
      );
}

asyncPrintValues(asyncWrap([])); // 'none'
asyncPrintValues(asyncWrap([1, 2, 3])); // '1, 2, 3'
```
