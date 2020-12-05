Turns `source` into a peekerator (often shortened to `peekr`), which is conceptually equivalent to an iterator but is often easier to work with. Peekerators always have a `current` step (of the shape `{ done, value }`) from the source iterator stored as `peekr.current`. This stateful API is useful since it allows you to see the current step without consuming it. This way you can choose to do nothing so that another part of your code will have the chance to act on the value instead. This is highly value in a number of common scenarios. A simple and common one is reacting when an iterable is empty:

```js
function printValues(values) {
  const peekr = peekerate(values);

  return peekr.done
    ? 'none'
    : stringFrom(interposeSeq(', ', peekr.asIterator()));
}

printValues([]); // 'none'
printValues([1, 2, 3]); // '1, 2, 3'
```

Here is the full interface that the `peekr` object conforms to:

```ts
interface Peekerator<T> {
  /**
   * Calls `next()` on the underlying iterator and stores the value in `current`.
   * Returns `this` for chaining.
   */
  advance(): this;
  /**
   * Calls `return()` on the underlying iterator.
   * Returns `this` for chaining.
   */
  return(): this;
  /**
   * Returns an iterable iterator which starts at the `current` step.
   * This means that equal(source, peekerate(source).asIterator()) is true
   */
  asIterator(): $IterableIterator<T>;

  /**
   * Returns the step object that was return by `next()`.
   * The actual typedefs define a tagged union for safety.
   */
  readonly current: { done: boolean; value: T | undefined };

  /**
   * A convenince getter for `current.done`
   */
  readonly done: boolean;

  /**
   * A convenince getter for `current.value`
   */
  readonly value: T;

  /**
   * The index of the step stored in `current`
   */
  readonly index: number;
}
```

Typescript note: The type of `peekr` (and `peekr.current`) will be refined when you use the value of `peekr.done` as a condition. This helps you avoid spurious errors about `peekr.value` potentially being `undefined`, but it gives rise to another problem: Tyescript doesn't understand that `peekr.advance()` makes its previous refinements invalid. Therefore you must help typescript understand this by writing `peekr = peekr.advance()`. If you do not do this you may discover that Typescript fails to catch some errors, or you may just give strange-looking errors about the type of `peekr` being `never`. This happens because typescript has refined the type of `peekr.done` twice, once to `true` and once to `false`. The type of `true & false` is `never` in Typescript.
