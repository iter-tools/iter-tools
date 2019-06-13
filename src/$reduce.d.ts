import { $IterableLike, $Promise, $MaybePromise } from './internal/$iterable';

declare function $reduce<O = any, T = any>(
  func: (acc: O, item: T, i: number) => O,
): (iterable: $IterableLike<T>) => $Promise<O>;

declare function $reduce<O = any, T = any>(
  initial: O,
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
): (iterable: $IterableLike<T>) => $Promise<O>;

declare function $reduce<O = any, T = any>(
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
  iterable: $IterableLike<T>,
): $Promise<O>;

declare function $reduce<O = any, T = any>(
  initial: O,
  func: (acc: O, item: T, i: number) => $MaybePromise<O>,
  iterable: $IterableLike<T>,
): $Promise<O>;

export default $reduce;
