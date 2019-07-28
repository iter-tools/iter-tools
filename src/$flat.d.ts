import {
  $InputIterable,
  $DefinedInputIterable,
  $GeneratorIterator,
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
declare function $flat<U>(depth: 0, iterable: U): $GeneratorIterator<$Flattened<U>>;
// prettier-ignore
declare function $flat<U>(depth: 1, iterable: U): $GeneratorIterator<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat<U>(depth: 2, iterable: U): $GeneratorIterator<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat<U>(depth: 3, iterable: U): $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 4, iterable: U): $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 5, iterable: U): $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 6, iterable: U): $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 7, iterable: U): $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

// prettier-ignore
declare function $flat(depth: 0): <U>(iterable: U) => $GeneratorIterator<$Flattened<U>>;
// prettier-ignore
declare function $flat(depth: 1): <U>(iterable: U) => $GeneratorIterator<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat(depth: 2): <U>(iterable: U) => $GeneratorIterator<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat(depth: 3): <U>(iterable: U) => $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat(depth: 4): <U>(iterable: U) => $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat(depth: 5): <U>(iterable: U) => $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat(depth: 6): <U>(iterable: U) => $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat(depth: 7): <U>(iterable: U) => $GeneratorIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

declare function $flat(
  shouldFlat: (item: any) => $MaybePromise<boolean>,
  depth: number,
  iter: $InputIterable<any>,
): $GeneratorIterator<any>;

declare function $flat(iterable: $InputIterable<any>): $GeneratorIterator<any>;
declare function $flat(depth: number, iterable: $InputIterable<any>): $GeneratorIterator<any>;
declare function $flat(depth?: number): (iterable: $InputIterable<any>) => $GeneratorIterator<any>;

export default $flat;
