A configurable factory for `deepEqual` methods having the signature `deepEqual(...values) => boolean`. The factory allows `options` to be passed to customize of comparison behavior. Permissive defaults (see below) have been chosen, so if that is all you need you can simply use the exported [deepEqual](#deepequal) method.

Some behavior is common to all `deepEqual` methods, regardless of the `options` they were created with:

All `deepEqual` methods recurse when ecountering nested iterables.

```js
deepEqual([], []); // true
deepEqual([[]], [[]]); // true
```

All `deepEqual` methods consider iterables equal if their contents are equal. The prototype and own properties of iterable objects cannot be considered.

No `deepEqual` method will consider an iterable equal to a non-iterable.

```js
deepEqual([{}], [[]]); // false
```

No `deepEqual` method will consider a string equal to an iterable of characters. While they may be equivalent from the perspective of their iterators, there are virtually no APIs where you may safely substitute one representation for the other.

```js
deepEqual('abc', ['a', 'b', 'c']); // false
```

The following are the available `options`:

#### compareFactory

A factory of the form `options => compare`, where compare is described above and `options` are those passed to the factory. Having the options allows you to make a new `deepCompare` which you can use to recurse in the same (or a modified) fashion. This is best illustrated by showing the default value for `compareFactory`, which recurses on the entries of objects.

```js
const isObj = o => o && typeof o === 'object'

const compareFactory = options => {
  return (a, b) =>
  const deepEqual = deepEqualFactory(options);
    isObject(a) && isObject(b)
      ? deepEqual(objectEntries(a), objectEntries(b))
      : Object.is(a, b);
};

const deepEqual = deepEqualFactory({ compareFactory });
deepEqual({}, {}); // true
deepEqual([{}], [{}]); // true
deepEqual({ iter: ['val'] }, { iter: ['val'] }); // true
```

#### compare

Syntactic sugar for `compareFactory: _ => compare` for use when recursive comparison inside values is not needed. One of `compare` or `compareFactory` may be specified, but not both.

```js
const obj = {};
const compare = (a, b) => a === b;
const deepEqual = deepEqualFactory({ compare });
deepEqual([obj], [obj]); // true
deepEqual([[obj]], [[obj]]); // true
deepEqual([{}], [{}]); // false
```

#### compareValues (default: true)

If `deepEqual` is passed all non-iterables, whether to test them with `compare`. If `false`, the resulting method will throw if not all `values` are iterable.

```js
let deepEqual;
deepEqual = deepEqualFactory({ compareValues: false });
deepEqual(1, 1); // throws (numbers are not iterable)
deepEqual([1], [1]); // true

deepEqual = deepEqualFactory({ compareValues: true });
deepEqual(1, 1); // true
deepEqual([1], [1]); // true
```

#### iterableNullish (default: true)

Whether `null` and `undefined` are considered equal to `Iterable[]`.

```js
let deepEqual;
deepEqual = deepEqualFactory({ iterableNullish: true });
deepEqual([null], [undefined], [[]]); // true

deepEqual = deepEqualFactory({ iterableNullish: false });
deepEqual([null], [undefined]); // false
deepEqual([null], [[]]); // false
```

#### syncEqualsAsync (default: true)

Whether an `AsyncIterable` may be considered equal to an `Iterable` having the same contents.
