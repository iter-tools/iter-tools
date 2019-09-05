It expects to receive an iterable of strings to be joined, and a separator string. It concatenates each string with the separator in between.

```js
joinAsStringWith(' ', ['a', 'b', 'c']) // "a b c"
```

Note that the method technically is working with iterables of characters, which usually means strings but could also be another kind of iterable. E.g.
```js
joinAsStringWith(' ', [['a'], ['b'], ['c']]) // "a b c"
```
