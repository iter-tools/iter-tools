It runs a regular expression on a string. Every iteration returns a new match. You should use a "global" regular expression to return multiple matches. The returned object type is the same one returned by the "RegExp.prototype.exec" method (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

- [0] the full string matching the reg exp
- [1] ... [n] the matching groups
- index: the 0 based index of the match
- input: the original string

```js
const iter = regexpExec(/[0-9]{4}/g, '10/2/2013, 03/03/2015 12/4/1997');
for (let [match] of iter) {
  console.log(match); // '2013', '2015', '1997'
}
```

Notes:

- Global regular expressions are mutable; you can't reuse the same object more than once
- The destructuring expression [match] extracts only the first match
