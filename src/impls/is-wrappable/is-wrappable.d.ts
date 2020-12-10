import { Wrappable } from '../../types/iterable';

declare function isWrappable(value: any): value is Wrappable<unknown>;

export { isWrappable };
