import { $ResultIterable } from './$iterable';

export type $PartsIterable<T> = $ResultIterable<$PartIterable<T>>;

export type $PartIterable<T> = $ResultIterable<T>;
