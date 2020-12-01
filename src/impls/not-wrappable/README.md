Returns `false` if `value` [isIterable](#isiterable) or `value` [isNil](#isnil) (and `true` otherwise). When `notWrappable(value)`, passing `value` to [wrap](#wrap) (or any other method which expects a [SourceIterable](#sourceiterable)) will throw an error.

```js
notWrappable([]); // false
notWrappable(undefined); // false
notWrappable(null); // false
notWrappable({}); // true
notWrappable(4); // true
```
