import { GeneratorIterator } from './internal/iterable';

declare function values<T = any>(obj: { [id: string]: T } | null | undefined): GeneratorIterator<T>;

export default values;
