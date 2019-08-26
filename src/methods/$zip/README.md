Zip receives 2 or more iterables. It returns an iterable of entries, each of which contains one item from each of the input iterables. The iteration stops when the shortest input iterable is exausted.

```js
zip([1, 2], [3, 4], [5, 6, 7]); // [1, 3, 5], [2, 4, 6]
```
