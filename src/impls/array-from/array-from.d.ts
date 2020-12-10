import { Wrappable } from '../../types/iterable';

declare function arrayFrom<T>(source: Wrappable<T>): Array<T>;

export { arrayFrom };
