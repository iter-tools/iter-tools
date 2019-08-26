The equivalent of the array "filter" function.
```js
filter(isEven, range(4)); // 0, 2
await asyncFilter(animal => animal.kind.slice(1) === 'at', [
  {type: 'cat'},
  {type: 'rat'},
  {type: 'dog'},
]) // [{type: 'cat'}, {type: 'rat'}]
```
