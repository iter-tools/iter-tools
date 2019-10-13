Consumes an iterable, running a function for every value yielded. Passing only the function you get a curried version.

```js
consume(item => console.log(item), [1, 2, 3]); // prints 1, 2, 3
```
