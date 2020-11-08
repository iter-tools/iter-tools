import { $iterableCurry } from '../../internal/$iterable';
import { $GroupsIterator } from '../../internal/$groups-iterator';
import { $wrap } from '../../internal/$wrap';

export { split } from '../../internal/symbols';

export function $spliterateGrouped(source, strategy, options = {}) {
  return $wrap(new $GroupsIterator(source, strategy, options));
}

export default $iterableCurry($spliterateGrouped, {
  minArgs: 1,
  maxArgs: 2,
});
