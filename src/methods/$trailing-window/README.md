For every item in source, yields a window iterable of size **size** which contains the items leading up to and including that item. When there are not enough prior items to fill the window, the filler value ( default: `undefined`) will be used in place of the missing values.

```js
trailingWindow(3, [1, 2, 3, 4, 5]); // [undefined, undefined, 1] [undefined, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```
The option **filler** allows to specify a different value instead of undefined.
```js
trailingWindow(3, { filler: 0 }, [1, 2, 3, 4, 5]); // [0, 0, 1] [0, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```
Size can also be specified as a named option.
```js
trailingWindow({ size: 3 });
```
