It takes a regular expression and an iterators of strings and output an iterable containing the matches.
```js
const iter = regexpExecIter(/[0-9]+/g, ['1', '23', ' 2 ex', 'amp', 'le: 34', '6']);
for (let [match] of iter) {
  console.log(match); // 123, 2, 346
}
```
Note:
* global regular expressions are mutable, you can't reuse the same object more than once
* the destructuring expression [match] extract only the first match
