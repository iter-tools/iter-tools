call is a convenience method. Its implementation is:

```js
(fn, ...args) => fn(...args);
```

`call` has only one difference from `Function.prototype.call`, which is that it does not take a `thisArg`.
