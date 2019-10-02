import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $reduce<O = any, T = any>(
  func: (acc: O, item: T, i: number) => O,
): (iterable: $SourceIterable<T>) => $Promise<O>;

declare function $reduce<O = any, T = any>(
  initial: O,
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
): (iterable: $SourceIterable<T>) => $Promise<O>;

declare function $reduce<O = any, T = any>(
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $Promise<O>;

declare function $reduce<O = any, T = any>(
  initial: O,
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
  iterable: $SourceIterable<T>,
): $Promise<O>;

export default $reduce;
