It is a shorthand for zipping an index to an iterable:

```js
enumerate(repeat('x')); // Iterable[[0, 'x'], [1, 'x'], [2, 'x'], ...]
```

You can also specify a **startIdx** which will be the index of the first item.

```js
enumerate(1, 'abc'); // Iterable[[1, 'a'], [2, 'b'], [3, 'c']]
```
