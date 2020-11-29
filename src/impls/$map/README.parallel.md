Defaults:

- `concurrency`: `4`

A variant of map with more complicated logic that can optimize when you have both an async mapper callback and an async souce iterable. It starts fetching the next value in the source iterable while waiting for the async callback to resolve. The optional concurrency paramater dictates how many values can be read ahead from the source iterable while
still waiting for the results of previous mapper callbacks.

```js
await asyncMapParallel(asyncMapper, asyncIterable);
await asyncMapParallel(10, asyncMapper, asyncIterable);
```
