import { Loopable } from '../../types/iterable';

declare function isLoopable(value: any): value is Loopable<unknown>;

export { isLoopable };
