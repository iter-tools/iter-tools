It split an iterables in lines, joining fragments when there are no new line between them. It is compatible with any type of newline characters (it can't be curried).
```js
splitLines(['a\nb', 'c\n', 'd']); // a, bc, d
```
