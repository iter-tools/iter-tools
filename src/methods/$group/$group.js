import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable';
import { $groupBy } from '../$group-by/$group-by';

export function group(iterable) {
  return $groupBy($ensureIterable(iterable), (_) => _);
}

export default $wrapWithResultIterable(group);
