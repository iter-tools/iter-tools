import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $reduce<T>(
  func: (acc: T, item: T, i: number) => T,
): (iterable: $SourceIterable<T>) => $Promise<T>;

declare function $reduce<O, T>(
  func: (acc: O, item: T, i: number) => O,
): (iterable: $SourceIterable<T>) => $Promise<O>;

declare function $reduce<O, T>(
  initial: O,
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
): (iterable: $SourceIterable<T>) => $Promise<O>;

declare function $reduce<T>(
  func: (acc: T, item: T, i: number) => $MaybePromise<T>,
  iterable: $SourceIterable<T>,
): $Promise<T>;

declare function $reduce<O, T>(
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $Promise<O>;

declare function $reduce<O, T>(
  initial: O,
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $Promise<O>;

export default $reduce;
