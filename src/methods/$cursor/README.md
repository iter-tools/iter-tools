It returns every item of the sequence and its n preceding items (or succeeding items). It takes as arguments the window **size** and **trailing** option (default false). When trailing is false every iteration returns an item and its preceding items, when trailing true every iteration returns an item and its succeeding items.
```js
cursor({ size: 3 }, [1, 2, 3, 4, 5]); // [undefined, undefined, 1] [undefined, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]

cursor({ size: 3, trailing: true }, [1, 2, 3, 4, 5]); // [1, 2, 3] [2, 3, 4] [3, 4, 5] [4, 5, undefined] [5, undefined, undefined]
```
The option **filler** allows to specify a different value instead of undefined.
```js
cursor({ size: 3, filler: 0 }, [1, 2, 3, 4, 5]); // [0, 0, 1] [0, 1, 2] [1, 2, 3] [2, 3, 4] [3, 4, 5]
```
