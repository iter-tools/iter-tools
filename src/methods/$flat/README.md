It flattens an iterable. You can specify the maximum depth as first argument (default 1). ```0``` means "no flatten", ```Infinity``` means "deep flatten".
```js
flat([1, [2, 3], [4, [5, 6]]]); // 1, 2, 3, 4, [5, 6]
flat(2, [1, [2, 3], [4, [5, 6]]]); // 1, 2, 3, 4, 5, 6
```
The algorithm takes into consideration every item that is iterable, except strings.
Alternatively, you can pass a function that takes the current item and returns true if the item is a sequence which can be flattened.
```js
const isString = item => typeof item === 'string' && item.length > 1

flat(isString, Infinity, ['hel', ['lo', ''], ['world']]); // h e l l o w o r l d
```

Finally for maximum readability you can specify flat's options as an object, like so:
```js
flat({ shouldFlat: isString, depth: Infinity }, ['hel', ['lo', ''], ['world']]); // h e l l o w o r l d
```
