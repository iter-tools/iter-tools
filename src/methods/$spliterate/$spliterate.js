import { $iterableCurry } from '../../internal/$iterable';
import { $PartsIterator } from '../../internal/$parts-iterator';
import { $wrap } from '../../internal/$wrap';

export { split } from '../../internal/symbols';

export function $spliterate(source, strategy, options = {}) {
  return $wrap(new $PartsIterator(source, strategy, options));
}

export default $iterableCurry($spliterate, {
  minArgs: 1,
  maxArgs: 2,
});
