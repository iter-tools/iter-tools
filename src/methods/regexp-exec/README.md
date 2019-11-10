Yields matches from executing `regexp.exec(str)`. A match is an array of `[fullMatch, ...submatches]`. It is beyong the scope of these docs to provide a full accounting of `RegExp.prototype.exec`, which you can find [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec).

```js
const iter = regexpExec(
  /[0-9]{4}/g,
  '10/2/2013, 03/03/2015 12/4/1997',
);
for (let [match] of iter) {
  console.log(match); // '2013', '2015', '1997'
}
```
