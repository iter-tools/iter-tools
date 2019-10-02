import { ResultIterable } from '../../internal/iterable';

declare function range(end: number): ResultIterable<number>;
declare function range(start: number, end: number, step?: number): ResultIterable<number>;
declare function range(opts: {
  start?: number;
  end?: number;
  step?: number;
}): ResultIterable<number>;
declare function range(_?: undefined): ResultIterable<number>;

export default range;
