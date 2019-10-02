import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $isEmpty(iterable: $SourceIterable<any>): $Promise<boolean>;

export default $isEmpty;
