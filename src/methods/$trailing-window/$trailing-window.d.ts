import { Repeat8 } from '../../internal/types/utility';
import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $trailingWindow<Size extends number, Filler = undefined, T = any>(
  opts: {
    readonly size: Size;
    readonly filler?: Filler;
  },
  iterable: $SourceIterable<T>,
): $ResultIterable<Repeat8<T | Filler, Size>>;

export default $trailingWindow;
