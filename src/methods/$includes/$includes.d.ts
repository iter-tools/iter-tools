import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $includes(value: any): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includes(value: any, iterable: $SourceIterable<any>): $Promise<boolean>;

export default $includes;
