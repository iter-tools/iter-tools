For each value in `source`, executes `callback(value, idx)` and yields the value (unmodified). Note that while this looks similar to what a `for..of` loop or `forEach` method might do, the key difference is that `tap` does not force evaluation of the iterable.

```js
pipeExec(
  [0, 1, 2],
  filter(item => !!item),
  tap(item => console.log(item)),
  map(item => item + 1),
); // Logs 1, 2 and returns Iterable[2, 3]
```
