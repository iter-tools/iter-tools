# The iter-tools Cookbook

Here are some ideas about how iter-tools could simplify common coding tasks!

## Successive functional operations
If you're already familiar with the advantages of iterators, you should skip this section.

The functional style is very convenient and powerful and javascript. You will frequently find that it is helpful to express transformations on data as a series of calls to methods like Array.map and Array.filter. For example:
```js
const users = [
  [1, {first: 'Ada', last: 'Lovelace', status: 'active'}],
  null,
  [3, {status: 'banned'}],
  [4, {nameless: true, status: 'active'}], // TODO 2/2/1994 remove nameless users
];

const activeUserNames =
  users
    .filter(Boolean) // separate for the purposes of type checking, perhaps
    .filter(([id, user]) => user.status === 'active')
    .map(([id, user]) => [user.first, user.last].join(' '))
    .filter(name => name.length > 0);
```

In this (possibly slightly contrived) example, the problem is that each of our four functional operations creates a separate array. If our list of users was large to begin with, we're wasting a lot of memory and making unnecessary work for the garbage collector in order to allocate intermediate arrays which are not part of our output anyway. In this regard our function is four times heavier than it needs to be! Iterators avoid making those intermediate allocations by executing all their specified transformations on an individual item before moving on to the next item.

**BUT.** This is a trade off, not a pure win. Native array operations like `Array.map` and `Array.filter` are extremely fast. They can be up to ten times faster than their iterator-based counterparts. If you are not working with particularly long datasets, the raw speed of native code working with memory may be more desirable.

Using iter-tools, the above example would look like:
```js
import { map, filter, compose, toArray } from 'iter-tools';

const activeUserNames = compose(
    toArray,
    filter(name => name.length > 0),
    map(([id, user]) => [user.first, user.last].join(' ')),
    filter(([id, user]) => user.status === 'active'),
    filter(Boolean),
  )(users);
```

## The toolbox that should have come with [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

The silliest thing about es6 Maps is that they don't come with any tooling.

None of the standard functional utilites like `map` or `filter` can be found on `Map.prototype`. Instead there are only a few iterators exposed, and a constructor that takes iterables... My personal theory is that the language authors recognized that these methods could be easily (and reusably) implemented by an iterator library.

So here they are, the missing methods for Maps!

### Instantiating Maps
```js
const myMap = new Map(entries({
  foo: 'foo',
  bar: 'bar',
}));
```

### Copying Maps
```js
const myMapCopy = new Map(entries(myMap));
```

### A more convoluted example
```js
const users = new Map([
  [1, {name: 'Ada Lovelace', status: 'active'}],
  [3, {name: null, status: 'banned'}],
]);

const posts = new Map([
  [1, {user: 1, text: 'Hello world!'}],
  [2, {user: 1, text: 'The only certain things in life are death and taxes.'}],
  [3, {user: 3, text: 'HUGE SALES AT CARPET EMPORIUM! SAVE SAVE SAVE!'}]
]);

const postsByActiveUsers = new Map(compose(
  filter(([id, post]) => post.user.status === 'active'),
  map(([id, post]) => ({...post, user: users.get(post.user.id)})),
)(users));
```

## Managing asynchronicity

The lazy nature of iterators make them a great match for loading additional data. You get to write the code as if all the data were being fetched at once using common constructs like map, yet you can consume items from the iterator lazily, not fetching additional data until the user is ready.

From a UI perspective this is not a good pattern for random access paging, however it can work great for infinte scroll.

### Infinite Scroll
This example uses a synchronous iterator of Promises because the data which will be iterated over is known at the outset.
```js
const user = {
  friends: [4, 100, 101, 100021, 112358, ... ] // hundreds of items, perhaps
}

const batchedRequests = compose(
  map(Promise.all), // each user's data will be fetched in parallel
  batch(25),
  map(id => fetch(`users/${id}`).then(res => res.json()).then()),
)(user.friends);

const page1Results = await batchedRequests.next().value;
const page2Results = await batchedRequests.next().value;
```

### Cursor-based Infinite Scroll
Cursor based infinite scroll is designed eliminate problems with offset-based infinite scroll when data is dynamic. Coding something like `?offset=25` into a request to get page 2 can be problematic, since the appearance of new data in the feed could push to page 2 items which previously were already displayed as part of page 1. To avoid this cursor objects can be used to track a paging user's position in a feed.

Note also that we don't know for sure how many pages of data there will be when we start iterating. Items could be added to the middle of the list, creating more pages than existed when paging was initiated. For this reason we need to user async tools to accomplish this task.

This example is based on the structure of data specified in the [GraphQL connection specification](https://facebook.github.io/relay/graphql/connections.htm), though it doesn't use GraphQL.

```js
import last from 'array-last';

let cursor = null;
const cursorPagedResults = compose(
  asyncMap(response => response.edges.map(edge => edge.node)),
  asyncTakeWhile(reponse => response.pageInfo.hasNextPage),
  asyncTap(response => (cursor = last(response.edges).cursor)),
  asyncMap(response => res.json()),
  asyncMap(() => fetch(`/feed?pageSize=25${cursor ? `&after=${cursor}` : ''}`)),
)(range())

const {value: page1Results} = await cursorPagedResults.next();
const {value: page2Results} = await cursorPagedResults.next();
```

### Taking the biggest items
You'll have to combine takeSorted and first:
```js
first(takeSorted(1, iterable))
```

## Getting the arithmetic mean
```js
let nItems = 0

const total = reduce(0, (acc, n) => {
  nItems++
  return acc + n
}, iterable)

const mean = total / nItems
```

## Counting repeated items
You can do that with reduce:
```js
const counts = reduce(new Map(), (map, item) => {
  let count = map.get(item)
  map.set(item, typeof count === undefined ? 0 : count + 1)
  return map
}, 'a', 'a', 'b', 'c', 'a', 'c')
```
This will return:
```js
counts.get('a') // 3
counts.get('b') // 1
counts.get('c') // 2
```

## Compare 2 iterables
The following function checks if two iterables are equals. It uses a shallow comparison:
```js
function areEqual (iter1, iter2) {
  return every(([item1, item2]) => Object.is(item1, item2), zipAll(iter1, iter2))
}
```

## Use the same iterable more than once
*Fork* creates clones of an iterable. You can use that whenever you need to concume an iterable multiple times. For example multiplying an iterable by itself:
```js
const pow = (iter, n) => product(...slice(n, fork(iter)))
```

## Building a data pipeline
A data pipeline is a set of transformations that can be applied to an iterable. To build one, you leverage the currying and the *pipe* utility function:
```js
const dataPipeline = pipe(
  filter((n) => n % 2 === 0), // filter even numbers
  map((n) => n * n) // square numbers
)

for (const n of dataPipeline(iterable)) {
  // n is a square of an even number
}
```
There are cases where you need to process data in parallel and applying different transformations. You can do so, using *fork* to clone the iterable, applying different transformations to the clones, and joining the iterable back together using for example *zip* or *merge*.
```js
const dataPipeline = pipe(
  fork,
  ([iter1, iter2]) => zip(filter((n) => n % 2 === 0, iter1), map((n) => n * n, iter2))
)

for (const [n1, n2] of dataPipeline(iterable)) {
  // n1 is always even
  // n2 is always a square
  // the for loop ends when the even numbers are over
  // because -zip- stops when the shortest sequence is exhausted
}
```
You can have a more readable version applying the transformations, and joining back the iterables in two different phases
```js
const filterEven = filter((n) => n % 2 === 0)
const mapSquare = map((n) => n * n)
const dataPipeline = pipe(
  fork,
  ([iter1, iter2]) => [filterEven(iter1), mapSquare(iter2)]
  (iters) => zip(...iters)
)
```
The last step can be shortened using the *apply* helper:
```js
const filterEven = filter((n) => n % 2 === 0)
const mapSquare = map((n) => n * n)
const dataPipeline = pipe(
  fork,
  ([iter1, iter2]) => [filterEven(iter1), mapSquare(iter2)]
  apply(zip)
)
```

## Your recipe here!

If you have uncovered a use case where iterators can enhance the performance, readability, or maintainability of a particular coding task please submit a pull request to the cookbook!
