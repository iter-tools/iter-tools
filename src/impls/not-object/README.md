Returns `true` if `value` is not an object, and `false` otherwise. For details see the method's inverse: [isObject](#isobject). Type-safe in typescript.

```js
notObject({}); // false
notObject([]); // false
notObject(new Date()); // false
notObject(new (class Foo {})()); // false
notObject(null); // true
notObject(undefined); // true
notObject(Date); // true
notObject(class Foo {}); // true
```
