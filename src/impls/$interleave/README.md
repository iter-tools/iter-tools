Facilitates the creation of new strategies for interleaving values from multiple iterables. It does this by decorating the `strategy` [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*), which is to say providing it with arguments and yielding its values. The responsibilities of the wrapping code are to forward any provided `options`, decorate the source iterables with [peekerators](#peekerate), manage the special `all` peekerator, and to call `return()` on any incomplete peekerators. The `all` peekerator provides `all.done` to indicate whether interleaving is complete, and `all.value`: a reference to the first peekerator which is not done. The `all` peekerator cannot be advanced.

Both [collate](#collate) and [roundRobin](#roundrobin) are implemented using `interleave`, and it is expected that most use cases will be served by one or the other. Their implementations also serve as useful examples.

```js
function* alternatingStrategy(
  options,
  all,
  ...peekerators
) {
  const { count = 1 } = options;

  while (!all.done) {
    for (const peekr of peekerators) {
      for (let i = 0; i < count; i++) {
        if (!peekr.done) {
          yield peekr.value;
          peekr.advance();
        }
      }
    }
  }
}

const alternatingInterleave = interleave(
  alternatingStrategy,
);

const a = [1, 2, 5, 6];
const b = [3, 4, 7];

alternatingInterleave({ count: 2 }, a, b); // [1, 2, 3, 4, 5, 6, 7]
```

Note: This method has only cursory Typecript support because Typescript lacks the power to describe it. Instead you should include your own type definitions. The example code with typedefs might look like this:

```js
function* alternatingStrategy<T>(
  options: { count: number },
  all: Peekerator<Peekerator<T>>,
  ...peekerators: Array<Peekerator<T>>
) {
  // implementation is unchanged, but now type-safe
}

function alternatingInterleave<T>(
  count: number,
  ...sources: Array<Iterable<T>>
): IterableIterator<T> {
  return interleave(alternatingStrategy, { count }, ...sources);
});
```

A final note: if you are creating a strategy which takes no options, it would be wise to bind an empty options object to avoid the confusion that iter-tools' partial application rules could cause.

```js
const myInterleave = interleave(myStrategy, {});
```
