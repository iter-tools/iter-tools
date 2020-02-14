import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $includesSubseq(
  subseq: $SourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includesSubseq(
  subseq: $SourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

declare function $includesSubseq<V, T>(
  subseq: $SourceIterable<V>,
  compare: (value: V, item: T) => boolean,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $includesSubseq<V, T>(
  subseq: $SourceIterable<V>,
  compare: (value: V, item: T) => boolean,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $includesSubseq;
