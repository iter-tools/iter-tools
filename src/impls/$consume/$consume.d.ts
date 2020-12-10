import { $Promise } from '../../../generate/async.macro.cjs';
import { $Wrappable } from '../../types/$iterable';

declare function $consume<T>(iterable: $Wrappable<T>): $Promise<void>;

export { $consume };
