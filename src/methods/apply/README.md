apply is a convenience method. Its implementation is:
```js
(fn, args = []) => fn(...args)
```
`apply` has three main differences from `Function.prototype.apply`. It does not take a `thisArg`, the args to apply may be specified as an iterable, and if you do not pass the `args` iterable, the result is a partial application, not a no-args call to `fn`.
