Yields the values from `source`. Its main purposes include allowing nullable iterables to be treated as non-null iterables, and to give arbitrary iterables the semantics of iter-tools iterables.

```js
const maybeIterable =
  Math.random() > 0.5 ? [1, 2, 3] : null;

[...wrap(maybeIterable)]; // [1, 2, 3] OR []
```
