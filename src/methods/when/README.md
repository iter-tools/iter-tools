when is a helper you can use with es6 spread syntax (the `...` operator). In particular it helps avoid an unnecessarily difficult to read pattern that frequently causes code formatters (prettier, specifically) to emit an undesireable number of lines:

```js
const always = true;
const sometimes = Math.random() > 0.5;

const arr = [always, ...(sometimes ? [sometimes] : [])]; // [true, true] OR [true]
```

Instead, you can use the when method like so:

```js
const whenArr = [always, ...when(sometimes, [sometimes])]; // [true, true] OR [true]
```

The pattern works equally well with objects.

```js
const whenObj = {
  always,
  ...when(sometimes, { sometimes }),
}; // { always: true } OR { always: true, somtimes: true }
```

Note that the empty result of spread is both an empty object and an empty iterable at the same time. This means that `[...when(false, null)]` and `{...when(false, null)}` are both valid (same for `undefined`).
