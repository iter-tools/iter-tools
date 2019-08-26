The equivalent of the array "find" function (it can be curried).
```js
find(animal => animal.kind === 'dog', [{type: 'cat'}, {type: 'dog'}]) // {type: 'dog'}
```

Find also takes an optional value to be returned if no value is found:
```js
find({type: 'pet'}, animal => animal.kind === 'dog', []) // {type: 'pet'}
```
