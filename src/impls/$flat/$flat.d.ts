import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable, $Loopable, $IterableIterator } from '../../types/$iterable';

type $Flattened<T> = T extends Array<infer U>
  ? U
  : T extends ReadonlyArray<infer U>
  ? U
  : T extends $Loopable<infer U>
  ? U
  : T;

// prettier-ignore
declare function $flat<U>(depth: 0, source: U): $IterableIterator<$Flattened<U>>;
// prettier-ignore
declare function $flat<U>(depth: 1, source: U): $IterableIterator<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat<U>(depth: 2, source: U): $IterableIterator<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat<U>(depth: 3, source: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 4, source: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 5, source: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 6, source: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat<U>(depth: 7, source: U): $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

// prettier-ignore
declare function $flat(depth: 0): <U>(source: U) => $IterableIterator<$Flattened<U>>;
// prettier-ignore
declare function $flat(depth: 1): <U>(source: U) => $IterableIterator<$Flattened<$Flattened<U>>>;
// prettier-ignore
declare function $flat(depth: 2): <U>(source: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<U>>>>;
// prettier-ignore
declare function $flat(depth: 3): <U>(source: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>;
// prettier-ignore
declare function $flat(depth: 4): <U>(source: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>;
// prettier-ignore
declare function $flat(depth: 5): <U>(source: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>;
// prettier-ignore
declare function $flat(depth: 6): <U>(source: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>;
// prettier-ignore
declare function $flat(depth: 7): <U>(source: U) => $IterableIterator<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<$Flattened<U>>>>>>>>>;

declare function $flat(
  shouldFlat: (value: any) => $MaybePromise<boolean>,
  depth: number,
  iter: $Wrappable<any>,
): $IterableIterator<any>;

declare function $flat(
  options: {
    shouldFlat: (value: any) => $MaybePromise<boolean>;
    depth?: number;
  },
  iter: $Wrappable<any>,
): $IterableIterator<any>;

declare function $flat(source: $Wrappable<any>): $IterableIterator<any>;
declare function $flat(depth: number, source: $Wrappable<any>): $IterableIterator<any>;
declare function $flat(depth?: number): (source: $Wrappable<any>) => $IterableIterator<any>;

export { $flat };
