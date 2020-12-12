`when` is a helper for use with the es6 spread syntax (the `...` operator). When `condition` is truthy its result is `value` (`value()` if `value` is callable). When condition is falsy its result is an empty iterable object. This is useful to avoid an unnecessarily difficult to read pattern that often causes code formatters (prettier, specifically) to emit an undesireable number of lines:

```js
const always = true;
const sometimes = Math.random() > 0.5;

const arr = [always, ...(sometimes ? [sometimes] : [])]; // [true, true] OR [true]
```

Instead, you can use the when method like so:

```js
const whenArr = [
  always,
  ...when(sometimes, [sometimes]),
  ...when(sometimes, null), // nothing to spread? no problem
]; // [true, true] OR [true]
```

The pattern works equally well with objects.

```js
const whenObj = {
  always,
  ...when(sometimes, { sometimes }),
  ...when(sometimes, null),
}; // { always: true } OR { always: true, somtimes: true }
```

If `value` is a function it will only be evaluated when `expression` is true, simulating the short-circuit behavior of ternary expressions. This can help you avoid doing unnecessary expensive work:

```js
const whenArr = [
  always,
  ...when(sometimes, () => expensiveExpression),
]; // [] OR [...expensiveExpression]
```
