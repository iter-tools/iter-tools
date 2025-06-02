import { $Wrappable, $IterableIterator, $Unwrap } from '../../types/$iterable';

type ZipAll<Sources extends $Wrappable<unknown>[], Filler> = {
  [index in keyof Sources]: $Unwrap<Sources[index]> | Filler;
};

declare function $zipAll<F, Sources extends $Wrappable<unknown>[]>(
  options: { filler?: F },
  ...sources: Sources
): $IterableIterator<ZipAll<Sources, F>>;

declare function $zipAll<Sources extends $Wrappable<unknown>[]>(
  ...sources: Sources
): $IterableIterator<ZipAll<Sources, undefined>>;

export { $zipAll };
