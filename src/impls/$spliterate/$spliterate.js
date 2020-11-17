import { $iterableCurry } from '../../internal/$iterable.js';
import { $PartsIterator } from '../../internal/$parts-iterator.js';
import { $wrap } from '../../internal/$wrap.js';

export { split } from '../../internal/symbols.js';

export function $spliterate(source, strategy, options = {}) {
  return $wrap(new $PartsIterator(source, strategy, options));
}

export default /*#__PURE__*/ $iterableCurry($spliterate, {
  minArgs: 1,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
