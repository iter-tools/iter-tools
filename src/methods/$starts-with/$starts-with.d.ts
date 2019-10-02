import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $startsWith(value: any): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $startsWith(value: any, iterable: $SourceIterable<any>): $Promise<boolean>;

export default $startsWith;
