import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitOnSeq(
  same: (a: any, b: any) => boolean,
  separatorSeq: $Wrappable<any>,
): <T>(source: $Wrappable<T>) => $IterableIterator<$IterableIterator<T>>;

declare function $splitOnSeq<T>(
  same: (a: any, b: any) => boolean,
  separatorSeq: $Wrappable<any>,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

declare function $splitOnSeq<T>(
  separatorSeq: $Wrappable<any>,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

export { $splitOnSeq };
