For each value in `source`, executes `callback(value, idx)` and yields the value (unmodified). Note that while this looks similar to what a `for..of` loop or `forEach` method might do, the key difference is that `tap` does not force evaluation of the iterable.

```js
pipeExec(
  [0, 1, 2],
  filter((value) => !!value),
  tap((value) => console.log(value)),
  map((value) => value + 1),
); // Logs 1, 2 and returns Iterable[2, 3]
```
