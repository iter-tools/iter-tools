import { $async, $await } from '../../generate/async.macro';

import { $ResultIterable } from './$iterable';

export function $EntryIterable(...args) {
  $ResultIterable.call(this, ...args);
}

$async;
function* keys(iterable) {
  $await;
  for (const [key] of iterable) yield key;
}

$async;
function* values(iterable) {
  $await;
  for (const [, value] of iterable) yield value;
}

$EntryIterable.prototype = Object.assign(Object.create($ResultIterable.prototype), {
  constructor: $EntryIterable,
  keys() {
    return new $ResultIterable(keys, [this]);
  },
  values() {
    return new $ResultIterable(values, [this]);
  },
  entries() {
    return this;
  },
});
