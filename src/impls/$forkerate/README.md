Turns `source` into a forkerator (often shortened to `forkr`). At each step the user may call `forkr.fork()` to create a new iterable which yields values from `source` starting with `forkr.value`. Consumed values are cached efficiently until every active fork has read them.

```ts
interface Forkerator<T> extends Peekerator<T> {
  /**
   * Calls `next()` `n` times on the underlying iterator and stores the value in `current`.
   * Returns `this` for chaining.
   */
  advance(n: number): this;

  /**
   * The forked iterator yields values starting from the current position.
   */
  fork(): SingletonIterableIterator;
}
```

`forkerate()` is expected to be particularly useful for writing streaming parsers.

```js
import { forkerate, startsWithSeq } from '@iter-tools';

export function* stripComments(source) {
  const forkr = forkerate(source);

  while (true) {
    const isComment = startsWithSeq('//', forkr.fork());

    while (forkr.value !== '\n') {
      if (!isComment) yield forkr.value;
      forkr.advance();

      if (forkr.done) return;
    }

    if (!isComment) yield '\n';
    forkr.advance();
  }
}

str(stripComments('// comment\ncode')); // 'code'
```
