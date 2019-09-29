import { Repeat8 } from '../../internal/types/utility';
import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $window<Size extends number, Filler = undefined, T = any>(
  opts: {
    readonly size: Size;
    readonly filler?: Filler;
  },
  iterable: $InputIterable<T>,
): $GeneratorIterator<Repeat8<T | Filler, Size>>;

export default $window;
