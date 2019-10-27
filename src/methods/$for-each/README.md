Calls `callback(value, idx)` for each value in `iterable`. Note that as a consuming method, `forEach` is not lazy. It will trigger evaluation of `iterable`.

```js
forEach(value => console.log(value), [1, 2, 3]); // prints 1, 2, 3
forEach(value => console.log(value), null); //
```
