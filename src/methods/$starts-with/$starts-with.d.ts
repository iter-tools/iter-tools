import { $InputIterable, $Promise, $MaybePromise } from '../../internal/$iterable';

declare function $startsWith(value: any): (iterable: $InputIterable<any>) => $Promise<boolean>;

declare function $startsWith(value: any, iterable: $InputIterable<any>): $Promise<boolean>;

export default $startsWith;
