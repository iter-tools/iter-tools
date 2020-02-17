import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

// curried

// prettier-ignore
declare function $splitOnAnySubseq(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<string>>,
  compareEquality?: (value: string, item: string) => boolean,
): (source: string) => $ResultIterable<string>;

declare function $splitOnAnySubseq(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<any>>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAnySubseq<V, T>(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<V>>,
  compareEquality: (value: V, item: T) => boolean,
): (source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

// noncurried

// prettier-ignore
declare function $splitOnAnySubseq(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<string>>,
  compareEquality: (value: string, item: string) => boolean,
  source: string
): $ResultIterable<string>;

// prettier-ignore
declare function $splitOnAnySubseq(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<string>>,
  source: string
): $ResultIterable<string>;

declare function $splitOnAnySubseq<V, T>(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<V>>,
  compareEquality: (value: V, item: T) => boolean,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAnySubseq<T>(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<any>>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnAnySubseq;
