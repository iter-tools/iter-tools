import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $reduce<T>(
  reducer: (result: T, value: T, i: number) => $MaybePromise<T>,
): (iterable: $SourceIterable<T>) => $Promise<T>;

declare function $reduce<O, T>(
  reducer: (result: O, value: T, i: number) => $MaybePromise<O>,
): (iterable: $SourceIterable<T>) => $Promise<O>;

declare function $reduce<O, T>(
  initial: O,
  reducer: (result: O, value: T, i: number) => $MaybePromise<O>,
): (iterable: $SourceIterable<T>) => $Promise<O>;

declare function $reduce<T>(
  reducer: (result: T, value: T, i: number) => $MaybePromise<T>,
  iterable: $SourceIterable<T>,
): $Promise<T>;

declare function $reduce<O, T>(
  reducer: (result: O, value: T, i: number) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $Promise<O>;

declare function $reduce<O, T>(
  initial: O,
  reducer: (result: O, value: T, i: number) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $Promise<O>;

export default $reduce;
