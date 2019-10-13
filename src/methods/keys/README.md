Takes in a plain object, null, a Map, or any other object which defines an `keys` method.
When given an Object, it is equivalent to Object.keys, otherwise it calls `keys()`
When passed a nullish value, returns an empty iterable.

```js
const obj = { foo: 'bar', fox: 'far' };
const map = new Map(entries(obj));

Array.from(keys(obj)); // ['foo', 'fox'];
deepEqual(Array.from(keys(map)), keys(obj)); // true
```
