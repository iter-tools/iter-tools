The equivalent of the array "find" function. Takes a **predicate** and returns the first item from the iterable for which the predicate returns true.

```js
find(animal => animal.kind === 'dog', [{type: 'cat'}, {type: 'dog'}]) // {type: 'dog'}
```
