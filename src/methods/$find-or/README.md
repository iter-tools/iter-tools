Like [find](#find), but also takes a **notFoundValue** which it will return if the source is empty or if **predicate** does not match any items from the source.

```js
findOr(0, x => x > 10, [1, 2, 3]); // 0
```
