import { $Promise } from '../../../generate/async.macro.cjs';
import { $Wrappable } from '../../types/$iterable';

declare function $forEach<T>(
  callback: (value: T, i: number) => void,
): (iterable: $Wrappable<T>) => $Promise<void>;

declare function $forEach<T>(
  callback: (value: T, i: number) => void,
  iterable: $Wrappable<T>,
): $Promise<void>;

export { $forEach };
