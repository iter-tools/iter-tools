Returns `true` if `value` is [notIterable](#notiterable) and [notNil](#notnil), otherwise `false`. When `notWrappable(value)`, passing `value` to [wrap](#wrap) (or any other method which expects a [Wrappable](#Wrappable)) will throw an error.

```js
notWrappable([]); // false
notWrappable(undefined); // false
notWrappable(null); // false
notWrappable({}); // true
notWrappable(4); // true
```
