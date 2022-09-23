Returns a value from `iterable`. Calls `valueIsBest = comparer(mapper(best), mapper(value))` for each value in iterable, making `value` the new `best` if `valueIsBest` is truthy. If `iterable` contains only a single value that value will always be the best, and `comparer` will not be called. If array is empty, returns `undefined`.

For additional examples see [findBestOr](#findbestor).
