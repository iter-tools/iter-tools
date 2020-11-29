Yields the first `n` values from `source`.

```js
take(2, ['a', 'b', 'c']); // Iterable['a', 'b']
```

You should also consider using destructuring if you want individual named values and not an iterable of values. It is not necessary to use `take` when destructuring. With destructuring the above would become:

```js
const [first, second] = ['a', 'b', 'c'];
```
