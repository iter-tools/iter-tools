import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $SourceIterable, $DefinedSourceIterable, $ResultIterable } from '../../types/$iterable';

type $Flattened<T> = T extends Array<infer U>
  ? U
  : T extends ReadonlyArray<infer U>
  ? U
  : T extends $DefinedSourceIterable<infer U>
  ? U
  : T;

// prettier-ignore
declare function $flat<U>(depth: 0, source: U): $ResultIterable<$Flattened<U>>;
// prettier-ignore
declare function $flat<U>(depth: 1, source: U): $ResultIterable<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat<U>(depth: 2, source: U): $ResultIterable<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat<U>(depth: 3, source: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 4, source: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 5, source: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 6, source: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 7, source: U): $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

// prettier-ignore
declare function $flat(depth: 0): <U>(source: U) => $ResultIterable<$Flattened<U>>;
// prettier-ignore
declare function $flat(depth: 1): <U>(source: U) => $ResultIterable<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat(depth: 2): <U>(source: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat(depth: 3): <U>(source: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat(depth: 4): <U>(source: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat(depth: 5): <U>(source: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat(depth: 6): <U>(source: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat(depth: 7): <U>(source: U) => $ResultIterable<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

declare function $flat(
  shouldFlat: (value: any) => $MaybePromise<boolean>,
  depth: number,
  iter: $SourceIterable<any>,
): $ResultIterable<any>;

declare function $flat(
  options: {
    shouldFlat: (value: any) => $MaybePromise<boolean>;
    depth?: number;
  },
  iter: $SourceIterable<any>,
): $ResultIterable<any>;

declare function $flat(source: $SourceIterable<any>): $ResultIterable<any>;
declare function $flat(depth: number, source: $SourceIterable<any>): $ResultIterable<any>;
declare function $flat(depth?: number): (source: $SourceIterable<any>) => $ResultIterable<any>;

export { $flat };
