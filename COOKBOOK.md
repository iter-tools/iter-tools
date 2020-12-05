# The iter-tools Cookbook

### Printing a list

```js
function printListEN(values, oxfordComma = true) {
  const peekr = $peekerate(values);
  let result = '';

  if (peekr.done) return 'none';
  let last;
  while (!peekr.done) {
    last = peekr.current;
    peekr.advance();
    if (!peekr.done) {
      if (peekr.index > 1) result += ', ';
      result += last.value.toString();
    }
  }

  if (peekr.index > 2) {
    if (oxfordComma) {
      result += ', ';
    }
    result += 'and ';
  } else if (peekr.index > 1) {
    result += ' and ';
  }

  result += last.value.toString();
  return result;
});

printListEN([])); // 'none'
printListEN([1])); // '1'
printListEN([1, 2])); // '1 and 2'
printListEN([1, 2, 3])); // '1, 2, and 3'
```
