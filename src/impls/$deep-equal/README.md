Defaults:

- `same`: `Object.is`
- `coerceNil`: `true`

Returns `true` if all `values` are deepEqual to each other and `false` otherwise. Values are considered equal if they are iterables containing the same values, or if the result of `same(a, b, depth)` is truthy. `depth` represents the number of iterables wrapping the value. If `coerceNil` is `true` then `null` and `undefined` are considered to be iterables.

Note: `deepEqual` does not consider strings to be iterables. That would cause infinite recursion.

```js
deepEqual([1, 2, 3], [1, 2, 3], [1, 2, 3]); // true
deepEqual([[1, 2, 3]], [[1, 2, 3]], [[1, 2, 3]]); // true
deepEqual(1, 1, 1); // true
deepEqual(null, [], ''); // true

deepEqual([1, 2, 3], [3, 2, 1]); // false
```

Note that in order to avoid ambiguity `comparator` can only be passed to `__deepEqual`. If you need it just write this:

```js
function same(a, b) {
  return a.toUpperCase() === b.toUpperCase();
}

function myEqual(...values) {
  return __deepEqual(values, same, false);
}

myEqual('foo', 'FOO'); // true
myEqual(null, ''); // false
```
