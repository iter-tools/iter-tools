import {
  $InputIterable,
  $DefinedInputIterable,
  $IterableIterator,
  $MaybePromise,
} from './internal/$iterable';

type $Flattened<T> = T extends Array<infer U>
  ? U
  : T extends ReadonlyArray<infer U>
  ? U
  : T extends $DefinedInputIterable<infer U>
  ? U
  : T;

// prettier-ignore
declare function $flat<U>(depth: 0, iterable: U): $IterableIterator<$Flattened<U>>;
// prettier-ignore
declare function $flat<U>(depth: 1, iterable: U): $IterableIterator<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat<U>(depth: 2, iterable: U): $IterableIterator<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat<U>(depth: 3, iterable: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 4, iterable: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 5, iterable: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 6, iterable: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 7, iterable: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

// prettier-ignore
declare function $flat(depth: 0): <U>(iterable: U) => $IterableIterator<$Flattened<U>>;
// prettier-ignore
declare function $flat(depth: 1): <U>(iterable: U) => $IterableIterator<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat(depth: 2): <U>(iterable: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat(depth: 3): <U>(iterable: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat(depth: 4): <U>(iterable: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat(depth: 5): <U>(iterable: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat(depth: 6): <U>(iterable: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat(depth: 7): <U>(iterable: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

declare function $flat(
  shouldFlat: (item: any) => $MaybePromise<boolean>,
  depth: number,
  iter: $InputIterable<any>,
): $IterableIterator<any>;

declare function $flat(iterable: $InputIterable<any>): $IterableIterator<any>;
declare function $flat(depth: number, iterable: $InputIterable<any>): $IterableIterator<any>;
declare function $flat(depth?: number): (iterable: $InputIterable<any>) => $IterableIterator<any>;

export default $flat;
