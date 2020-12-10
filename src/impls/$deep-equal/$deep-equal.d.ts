import { $Promise } from '../../../generate/async.macro.cjs';

declare function $deepEqual(...values: Array<any>): $Promise<boolean>;

declare function $__deepEqual(
  iterables: Array<any>,
  same?: (a: any, b: any) => boolean,
  coerceNil?: boolean,
): $Promise<boolean>;

export { $__deepEqual, $deepEqual };
