import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $reduce<T>(
  reducer: (result: T, item: T, i: number) => T,
): (iterable: $SourceIterable<T>) => $Promise<T>;

declare function $reduce<O, T>(
  reducer: (result: O, item: T, i: number) => O,
): (iterable: $SourceIterable<T>) => $Promise<O>;

declare function $reduce<O, T>(
  initial: O,
  reducer: (result: O, item: T, i: number) => $MaybePromise<O>,
): (iterable: $SourceIterable<T>) => $Promise<O>;

declare function $reduce<T>(
  reducer: (result: T, item: T, i: number) => $MaybePromise<T>,
  iterable: $SourceIterable<T>,
): $Promise<T>;

declare function $reduce<O, T>(
  reducer: (result: O, item: T, i: number) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $Promise<O>;

declare function $reduce<O, T>(
  initial: O,
  reducer: (result: O, item: T, i: number) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $Promise<O>;

export default $reduce;
