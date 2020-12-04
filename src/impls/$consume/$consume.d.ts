import { $Promise } from '../../../generate/async.macro.cjs';
import { $SourceIterable } from '../../types/$iterable';

declare function $consume<T>(iterable: $SourceIterable<T>): $Promise<void>;

export { $consume };
