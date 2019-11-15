/* eslint-disable @typescript-eslint/class-name-casing */
import { $iteratorSymbol, $Promise } from '../../generate/async.macro';

import { $ResultIterable } from './$iterable';

export interface $EntryIterable<K, V> {
  next(value?: any): $Promise<IteratorResult<[K, V]>>;
  return(value?: any): $Promise<IteratorResult<[K, V]>>;
  throw(e?: any): $Promise<IteratorResult<[K, V]>>;
  keys(): $ResultIterable<K>;
  values(): $ResultIterable<V>;
  entries(): $ResultIterable<[K, V]>;
  [$iteratorSymbol](): this;
}
