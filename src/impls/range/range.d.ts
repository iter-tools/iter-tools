import { IterableIterator } from '../../types/iterable';

declare function range(end: number): IterableIterator<number>;
declare function range(start: number, end: number, step?: number): IterableIterator<number>;
declare function range(opts: {
  start?: number;
  end?: number;
  step?: number;
}): IterableIterator<number>;
declare function range(_?: undefined): IterableIterator<number>;

export { range };
