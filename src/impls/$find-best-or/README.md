Returns a value from `iterable`. Calls `valueIsBest = comparer(mapper(best), mapper(value))` for each value in iterable, making `value` the new `best` if `valueIsBest` is truthy. If `iterable` contains only a single value that value will always be the best, and `comparer` will not be called. If `iterable` is empty returns `notFoundValue`.

<!-- prettier-ignore -->
```js
const people = wrap([
  { name: 'Veruca Salt', age: 11 },
  { name: 'Charlie Bucket', age: 11 },
  { name: 'William Bucket', age: 44 }, 
  { name: 'Grandpa Joe', age: 96.5 },
]);

findBestOr((best, v) => v.age < best.age, people); // Veruca
findBestOr((best, v) => v.age <= best.age, people); // Charlie
findBestOr((best, v) => v.age > best.age, people); // Joe
```

This method can also be used in conjunction with the provided helper methods: [firstLowest](#firstlowest), [lastLowest](#lastlowest), [firstHighest](#firsthighest), and [lastHighest](#lasthighest).

```js
findBestOr(firstLowest, (p) => p.age, people); // Veruca
findBestOr(lastLowest, (p) => p.age, people); // Charlie
findBestOr(lastHighest, (p) => p.age, people); // Joe
```
