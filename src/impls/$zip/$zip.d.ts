import { $Wrappable, $IterableIterator, $Unwrap } from '../../types/$iterable';

type Zip<Sources extends $Wrappable<unknown>[]> = {
  [index in keyof Sources]: $Unwrap<Sources[index]>;
};

declare function $zip<Sources extends $Wrappable<unknown>[]>(
  ...sources: Sources
): $IterableIterator<Zip<Sources>>;

export { $zip };
