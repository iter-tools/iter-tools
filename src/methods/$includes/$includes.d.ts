import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $includes(value: any): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includes(value: any, iterable: $SourceIterable<any>): $Promise<boolean>;

declare function $includes<V, T>(
  value: V,
  compareEquality: (value: V, item: T) => boolean,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $includes<V, T>(
  value: V,
  compareEquality: (value: V, item: T) => boolean,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $includes;
