Returns `typeof value === 'object' && value !== null`. Note that iterables are objects, so it is expected that the most common way to use this method will to to first eliminate the possibility that `value` is an iterable (e.g. using [notIterable](#notiterable)). Type-safe in typescript.

Note: lodash has a popular method of the same name, which treats functions as objects as well. This method is what lodash calls `isObjectLike`.

```js
isObject({}); // true
isObject([]); // true
isObject(new Date()); // true
isObject(new (class Foo {})()); // true
isObject(null); // false
isObject(undefined); // false
isObject(Date); // false (function)
isObject(class Foo {}); // false (function)
```
