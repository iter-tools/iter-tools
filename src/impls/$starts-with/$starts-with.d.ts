import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $startsWith(value: any): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $startsWith(value: any, iterable: $SourceIterable<any>): $Promise<boolean>;

export default $startsWith;
