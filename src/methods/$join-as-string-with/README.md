Returns the concatenation of each string in `strings` with `separator` in between.

```js
joinAsStringWith(' ', ['aa', 'bb', 'cc']); // "aa bb cc"
```

Note that the method technically is working with iterables of characters (i.e. length 1 strings). A string is such an iterable but there are other forms too, e.g.:

```js
joinAsStringWith(' ', [['a', 'a'], ['b'], ['c', 'c']]); // "aa b cc"
```
