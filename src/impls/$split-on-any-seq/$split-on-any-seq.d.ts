import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitOnAnySeq(
  separatorSeqs: Array<$Wrappable<any>>,
): <T>(source: $Wrappable<T>) => $IterableIterator<$IterableIterator<T>>;

declare function $splitOnAnySeq<T>(
  separatorSeqs: Array<$Wrappable<any>>,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

export { $splitOnAnySeq };
