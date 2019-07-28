import { GeneratorIterator } from './internal/iterable';

declare function repeat<T>(obj: T, times?: number): GeneratorIterator<T>;

export default repeat;
