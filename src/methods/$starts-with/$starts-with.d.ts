import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $startsWith(value: any): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $startsWith(value: any, iterable: $SourceIterable<any>): $Promise<boolean>;

declare function $startsWith<V, T>(
  value: V,
  compare: (value: V, item: T) => boolean,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $startsWith<V, T>(
  value: V,
  compare: (value: V, item: T) => boolean,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $startsWith;
