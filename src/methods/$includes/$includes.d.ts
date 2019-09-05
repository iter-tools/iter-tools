import { $InputIterable, $Promise, $MaybePromise } from '../../internal/$iterable';

declare function $includes(value: any): (iterable: $InputIterable<any>) => $Promise<boolean>;

declare function $includes(value: any, iterable: $InputIterable<any>): $Promise<boolean>;

export default $includes;
