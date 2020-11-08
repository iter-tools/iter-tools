See [peekerate](#peekerate)

Note: Returns a promise of a peekerator, which is necessary for the first item to be fetched.

```js
const peekerator = await asyncPeekerate([1, 2, 3]);

while (!peekerator.done) {
  log(peekerator.value + 1);
  await peekerator.advance();
}
```
