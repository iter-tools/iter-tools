import { GeneratorIterator } from './internal/iterable';

declare function range(end: number): GeneratorIterator<number>;
declare function range(start: number, end: number, step?: number): GeneratorIterator<number>;
declare function range(opts: {
  start?: number;
  end?: number;
  step?: number;
}): GeneratorIterator<number>;
declare function range(_?: undefined): GeneratorIterator<number>;

export default range;
