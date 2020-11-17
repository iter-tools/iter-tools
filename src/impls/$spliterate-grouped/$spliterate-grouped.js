import { $iterableCurry } from '../../internal/$iterable.js';
import { $GroupsIterator } from '../../internal/$groups-iterator.js';
import { $wrap } from '../../internal/$wrap.js';

export { split } from '../../internal/symbols.js';

export function $spliterateGrouped(source, strategy, options = {}) {
  return $wrap(new $GroupsIterator(source, strategy, options));
}

export default /*#__PURE__*/ $iterableCurry($spliterateGrouped, {
  minArgs: 1,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
