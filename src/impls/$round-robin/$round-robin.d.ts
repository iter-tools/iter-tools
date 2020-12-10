import { $Wrappable, $IterableIterator } from '../../types/$iterable';

// prettier-ignore
declare function $roundRobin<T>(
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<T>;

declare function $roundRobin<T>(
  step: number,
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<T>;

declare function $roundRobin<T>(
  start: number,
  step: number,
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<T>;

declare function $roundRobin<T>(
  options: { start?: number; step?: number },
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<T>;

declare function $roundRobin(
  step: number,
): <T>(...sources: Array<$Wrappable<T>>) => $IterableIterator<T>;

declare function $roundRobin(
  start: number,
  step: number,
): <T>(...sources: Array<$Wrappable<T>>) => $IterableIterator<T>;

declare function $roundRobin(options: {
  start?: number;
  step?: number;
}): <T>(...sources: Array<$Wrappable<T>>) => $IterableIterator<T>;

export { $roundRobin };
