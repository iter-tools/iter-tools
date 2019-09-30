import { $Promise } from '../../../generate/async.macro';

import { $InputIterable, $Iterable } from '../../internal/$iterable';

declare function $isEmpty(iterable: $InputIterable<any>): $Promise<boolean>;

export default $isEmpty;
