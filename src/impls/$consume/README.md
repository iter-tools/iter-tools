Consumes `iterable`.

```js
function* log123() {
  console.log('1');
  yield;
  console.log('2');
  yield;
  console.log('3');
}

consume(log123); // prints 1 2 3
```
