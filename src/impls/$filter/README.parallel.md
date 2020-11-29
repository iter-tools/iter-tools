Defaults:

- `concurrency`: `4`

A variant of [filter](#filter) with more complicated logic that can optimize when you have both an async filter predicate and an async souce iterable. It starts fetching the next value in the source iterable while waiting for the async predicate to resolve. The optional concurrency paramater dictates how many values can be read ahead from the source iterable while still waiting for the results of previous async predicates.

```js
await asyncFilterParallel(asyncPredicate, asyncIterable);
await asyncFilterParallel(
  10,
  asyncPredicate,
  asyncIterable,
);
```
