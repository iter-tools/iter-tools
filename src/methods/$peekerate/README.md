Turns `source` into a peekerator (often shortened to `peekr`), which is conceptually equivalent to an iterator but is often easier to work with. Peekerators always have a `{done, value}` item from the source iterator stored as `peekr.current`. For convenience `peekr.done` and `peekr.value` are also present. To load the next item call `peekr.advance()`. No value is returned.

Peekerators allow an iterator to be used as internal state. Normal iterators are of course stateful, but less useful for this purpose as it is not possible to access their state without altering it. Peekerators are also have safer typedefs than iterators.

```js
const peekerator = peekerate([0, 1, 2]);

while (!peekerator.done) {
  log(peekerator.value + 1);
  peekerator.advance();
}

// logs 1, 2, 3
```

Also exported is the `Peekerator` base class. Instances should be made using `Peekerator.from(iteratable)`.

Note that in typescript definitions `Peekerator` is a type not a class, so if you need the class e.g. for `extends` or `instanceof` I have included an alias for `Peekerator` named `PeekeratorClass`. The alias has different typedefs that are less safe but also will not throw errors on value usages.
