declare function range<R extends number>(r: R): IterableIterator<number>;
declare function range(opts: {
  start: number;
  end?: number;
  step?: number;
}): IterableIterator<number>;
declare function range(_?: undefined): IterableIterator<number>;

export default range;
