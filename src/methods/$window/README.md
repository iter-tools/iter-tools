For every item in source, yields a window iterable of size **size** which starts with that item and also contains the next items from source. When there are not enough additional items in source to fill the window, the filler value (default: `undefined`) will be used in place of the missing values.

```js
window(3, [1, 2, 3, 4, 5]); // [undefined, undefined, 1] [undefined, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```

The option **filler** allows to specify a different value instead of undefined.

```js
window(3, { filler: 0 }, [1, 2, 3, 4, 5]); // [0, 0, 1] [0, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```

**size** can also be specified as a named option.

```js
window({ size: 3 });
```
