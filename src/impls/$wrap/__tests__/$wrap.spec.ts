import assert from 'static-type-assert';

import { $Promise } from '../../../../generate/async.macro.cjs';

import { $IterableIterator } from '../../../types/$iterable';
import { $wrap } from 'iter-tools-es';

declare const Ø: never;

assert<$IterableIterator<1 | 2 | 3>>($wrap(Ø as [$Promise<1>, $Promise<2>, $Promise<3>]));
