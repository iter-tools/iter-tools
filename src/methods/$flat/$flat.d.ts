import {
  $SourceIterable,
  $DefinedSourceIterable,
  $ResultIterable,
  $MaybePromise,
} from '../../internal/$iterable';

type $Flattened<T> = T extends Array<infer U>
  ? U
  : T extends ReadonlyArray<infer U>
  ? U
  : T extends $DefinedSourceIterable<infer U>
  ? U
  : T;

// prettier-ignore
declare function $flat<U>(depth: 0, iterable: U): $ResultIterable<$Flattened<U>>;
// prettier-ignore
declare function $flat<U>(depth: 1, iterable: U): $ResultIterable<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat<U>(depth: 2, iterable: U): $ResultIterable<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat<U>(depth: 3, iterable: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 4, iterable: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 5, iterable: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 6, iterable: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 7, iterable: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

// prettier-ignore
declare function $flat(depth: 0): <U>(iterable: U) => $ResultIterable<$Flattened<U>>;
// prettier-ignore
declare function $flat(depth: 1): <U>(iterable: U) => $ResultIterable<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat(depth: 2): <U>(iterable: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat(depth: 3): <U>(iterable: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat(depth: 4): <U>(iterable: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat(depth: 5): <U>(iterable: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat(depth: 6): <U>(iterable: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat(depth: 7): <U>(iterable: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

declare function $flat(
  shouldFlat: (item: any) => $MaybePromise<boolean>,
  depth: number,
  iter: $SourceIterable<any>,
): $ResultIterable<any>;

declare function $flat(iterable: $SourceIterable<any>): $ResultIterable<any>;
declare function $flat(depth: number, iterable: $SourceIterable<any>): $ResultIterable<any>;
declare function $flat(depth?: number): (iterable: $SourceIterable<any>) => $ResultIterable<any>;

export default $flat;
