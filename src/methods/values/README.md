Takes in a plain object, null, a Map, or any other object which defines an `values` method.
When given an Object, it is equivalent to Object.values, otherwise it calls `values()`
When passed a nullish value, returns an empty iterable.

```js
const obj = {foo: 'bar', fox: 'far'}
const map = new Map(entries(obj))

Array.from(values(obj)) // ['bar', 'far']
deepEqual(Array.from(values(map)), values(obj)) // true
```
