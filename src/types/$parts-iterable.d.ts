import { $ResultIterable } from './$iterable';

export type $PartIterable<T> = $ResultIterable<T>;

export type $PartsIterable<T> = $ResultIterable<$PartIterable<T>>;
