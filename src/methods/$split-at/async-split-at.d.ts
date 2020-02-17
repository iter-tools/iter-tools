import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncSplitAt(idx: number): <T>(source: AsyncSourceIterable<T>) => SyncResultIterable<AsyncResultIterable<T>>; // prettier-ignore

declare function asyncSplitAt<T>(
  idx: number,
  source: AsyncSourceIterable<T>,
): SyncResultIterable<AsyncResultIterable<T>>;

export default asyncSplitAt;
