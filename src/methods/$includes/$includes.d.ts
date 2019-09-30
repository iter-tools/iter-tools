import { $Promise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $includes(value: any): (iterable: $InputIterable<any>) => $Promise<boolean>;

declare function $includes(value: any, iterable: $InputIterable<any>): $Promise<boolean>;

export default $includes;
