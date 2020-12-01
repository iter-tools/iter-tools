Returns `true` if `value` is iterable (which is to say it has a `Symbol.iterator` property) and `false` otherwise. Iterables are inputs (often named `source` or `iterable`) to most `iter-tools` methods, so it is useful to know all the ways you can create them:

Javascript's builtin data types are iterable:

```js
isIterable([]); // true
isIterable(new Map()); // true
isIterable(new Set()); // true
```

Any class can be iterable if it defines a `Symbol.iterator` method. Note that something similar works just as well if you are still constructing your prototype chains without the help of the `class` keyword.

```js
class MyClass {
  constructor(data = []) {
    this.data = data;
  },

  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }
}
isIterable(new MyClass())
```

The result of calling a generator function is an iterable iterator. Generator functions are highly useful implementing any kind of operation. Most `iter-tools` are implemented using them internally.

```js
function* range() {
  for (let i = 0; ; i++) yield i;
}
isIterable(range()); // true
```

All iterators _should_ also be iterables. This can be achieved by returning `this` from the `Symbol.iterator` method like so:

```js
const yesIterator = {
  next() {
    return { value: 'yes', done: false }
  }
  [Symbol.iterator]() {
    return this;
  }
}
isIterable(yesIterator); // true
```

Many iterators use `return this` (as above) to ensure they can be used anywhere an iterable can be. This means you can write confusing things like `[Symbol.iterator]()[Symbol.iterator]()`. Beware however! While this is often safe you must remember that the value returned by `[Symbol.iterator]()` is not required to be an iterable: it must only be an iterator.

Other kinds of values are not iterable, though `iter-tools` chooses to allow `null` and `undefined` in most places an iterable is expected.

```js
isIterable(undefined); // false
isIterable(null); // false
isIterable(42); // false
isIterable({}); // false
```

Note: `isIterable` does not check to make sure that `Symbol.iterator` is a method. Code in which `Symbol.iterator` is not a method is always incorrect, and attempted usage of such an "iterable" will trigger an appropriate error at the language level.
