import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $includes(value: any): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includes(value: any, iterable: $SourceIterable<any>): $Promise<boolean>;

export { $includes };
