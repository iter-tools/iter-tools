import { Repeat8 } from '../../internal/types/utility';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $window<Size extends number, Filler = undefined, T = any>(
  opts: {
    readonly size: Size;
    readonly filler?: Filler;
  },
  source: $SourceIterable<T>,
): $ResultIterable<Repeat8<T | Filler, Size>>;

export default $window;
