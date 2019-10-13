Tap is not unlike a forEach method, and like forEach is usually used to express side effects. Without breaking a chain of composition, it allows you access to the value yielded to it. Tap always yields the same value it received. Tap can be curried.

```js
compose(
  tap(item => console.log(item)),
  filter(item => !!item),
)([0, 1, 2]); // logs "1", "2". returns Iterable[1, 2]
```
